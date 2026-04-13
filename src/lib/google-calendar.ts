/**
 * Módulo de integración con Google Calendar.
 *
 * Dos modos de uso:
 *
 * 1. **Sin backend (link directo):**
 *    Genera un enlace que abre Google Calendar con los datos pre-llenados.
 *    No requiere API keys ni OAuth. El usuario lo agrega a su propio calendario.
 *
 * 2. **Con backend (API de Google Calendar):**
 *    Crea eventos directamente en el calendario de la clínica.
 *    Requiere configurar credenciales OAuth2 y la ruta API en /api/booking.
 *    Ver: src/pages/api/booking.ts
 */

export interface CalendarEventOptions {
  /** Título del evento */
  title: string;
  /** Descripción / notas adicionales */
  description?: string;
  /** Fecha y hora de inicio (ISO 8601) */
  startDateTime: string;
  /** Duración en minutos (default: 60) */
  durationMinutes?: number;
  /** Ubicación */
  location?: string;
}

/**
 * Genera un enlace directo a Google Calendar para crear un evento.
 * No requiere API ni autenticación — se abre en el navegador del usuario.
 */
export function buildGoogleCalendarURL(options: CalendarEventOptions): string {
  const {
    title,
    description = "",
    startDateTime,
    durationMinutes = 60,
    location = "",
  } = options;

  const start = new Date(startDateTime);
  const end = new Date(start.getTime() + durationMinutes * 60_000);

  // Formato: YYYYMMDDTHHmmssZ
  const fmt = (d: Date) =>
    d
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: description,
    location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Abre Google Calendar en una nueva pestaña para crear el evento.
 */
export function openGoogleCalendar(options: CalendarEventOptions): void {
  const url = buildGoogleCalendarURL(options);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Crea un evento vía la API del backend (/api/booking).
 * Requiere que el endpoint esté configurado con credenciales de Google Calendar API.
 */
export async function createCalendarEvent(
  options: CalendarEventOptions & { patientName: string; patientPhone: string }
): Promise<{ success: boolean; eventId?: string; error?: string }> {
  try {
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      const error = await response.text();
      return { success: false, error };
    }

    const data = await response.json();
    return { success: true, eventId: data.eventId };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Error de conexión",
    };
  }
}
