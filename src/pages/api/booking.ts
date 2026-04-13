// Esta ruta se ejecuta en el servidor (no se pre-renderiza)
export const prerender = false;

/**
 * API endpoint para crear eventos en Google Calendar.
 *
 * ── Configuración requerida ──
 *
 * 1. Ve a https://console.cloud.google.com
 * 2. Crea un proyecto (o usa uno existente)
 * 3. Activa "Google Calendar API"
 * 4. Crea una Service Account (para uso servidor a servidor):
 *    - IAM & Admin → Service Accounts → Create
 *    - Descarga la clave JSON
 * 5. Comparte el calendario de la clínica con el email de la Service Account
 *    (dale permisos de "Hacer cambios en eventos")
 * 6. Agrega las variables de entorno en Vercel o en tu .env:
 *    - GOOGLE_CALENDAR_ID=tu_calendario@gmail.com
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL=sa@proyecto.iam.gserviceaccount.com
 *    - GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
 *
 * ── Alternativa: OAuth2 para cuenta personal ──
 * Si prefieres usar OAuth2 con la cuenta de Gmail directamente,
 * necesitarás un flujo de autorización y refresh token.
 * Consulta: https://developers.google.com/calendar/api/quickstart/nodejs
 */

import type { APIRoute } from "astro";

// Interfaz del body esperado
interface BookingRequest {
  title: string;
  description: string;
  startDateTime: string;
  durationMinutes: number;
  location?: string;
  patientName: string;
  patientPhone: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: BookingRequest = await request.json();

    // Validación básica
    if (!body.title || !body.startDateTime || !body.patientName) {
      return new Response(
        JSON.stringify({ error: "Faltan campos requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verificar que las credenciales están configuradas
    const calendarId = import.meta.env.GOOGLE_CALENDAR_ID;
    const serviceAccountEmail = import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = import.meta.env.GOOGLE_PRIVATE_KEY;

    if (!calendarId || !serviceAccountEmail || !privateKey) {
      return new Response(
        JSON.stringify({
          error:
            "Google Calendar no está configurado. Configura las variables de entorno GOOGLE_CALENDAR_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_PRIVATE_KEY.",
        }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generar JWT para autenticación con Service Account
    const jwt = await createServiceAccountJWT(
      serviceAccountEmail,
      privateKey.replace(/\\n/g, "\n")
    );

    // Obtener access token
    const tokenResponse = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: jwt,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const err = await tokenResponse.text();
      return new Response(
        JSON.stringify({ error: `Error de autenticación: ${err}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { access_token } = await tokenResponse.json();

    // Crear evento en Google Calendar
    const start = new Date(body.startDateTime);
    const end = new Date(
      start.getTime() + (body.durationMinutes || 60) * 60_000
    );

    const event = {
      summary: body.title,
      description: body.description,
      location: body.location || "",
      start: {
        dateTime: start.toISOString(),
        timeZone: "America/Mexico_City",
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: "America/Mexico_City",
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    };

    const calResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );

    if (!calResponse.ok) {
      const err = await calResponse.text();
      return new Response(
        JSON.stringify({ error: `Error al crear evento: ${err}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const calData = await calResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        eventId: calData.id,
        htmlLink: calData.htmlLink,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Error interno",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

/**
 * Crea un JWT firmado para la Service Account de Google.
 * Usa Web Crypto API (funciona en Vercel Edge y Node 18+).
 */
async function createServiceAccountJWT(
  email: string,
  privateKeyPem: string
): Promise<string> {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: email,
    scope: "https://www.googleapis.com/auth/calendar.events",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const enc = new TextEncoder();

  const b64url = (data: Uint8Array | string) => {
    const str =
      typeof data === "string"
        ? btoa(data)
        : btoa(String.fromCharCode(...data));
    return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  };

  const headerB64 = b64url(enc.encode(JSON.stringify(header)));
  const payloadB64 = b64url(enc.encode(JSON.stringify(payload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  // Importar la clave privada
  const pemBody = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0));

  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = new Uint8Array(
    await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      enc.encode(signingInput)
    )
  );

  return `${signingInput}.${b64url(signature)}`;
}
