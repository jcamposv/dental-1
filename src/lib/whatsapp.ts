/**
 * Módulo de integración con WhatsApp.
 *
 * Genera enlaces wa.me con mensaje pre-llenado.
 * No requiere API ni backend — funciona directamente en el navegador.
 */

interface WhatsAppMessageOptions {
  /** Número de WhatsApp en formato internacional (solo dígitos, ej: "5215512345678") */
  number: string;
  /** Nombre del paciente */
  name?: string;
  /** Servicio solicitado */
  service?: string;
  /** Fecha preferida (texto libre) */
  date?: string;
  /** Hora preferida */
  time?: string;
  /** Mensaje personalizado */
  customMessage?: string;
}

/**
 * Genera la URL de WhatsApp con el mensaje pre-llenado.
 */
export function buildWhatsAppURL(options: WhatsAppMessageOptions): string {
  const { number, name, service, date, time, customMessage } = options;

  let message: string;

  if (customMessage) {
    message = customMessage;
  } else {
    const parts = ["Hola, me gustaría agendar una cita en Otto Dental."];
    if (name) parts.push(`Mi nombre es ${name}.`);
    if (service) parts.push(`Estoy interesado/a en: ${service}.`);
    if (date) parts.push(`Fecha preferida: ${date}.`);
    if (time) parts.push(`Hora preferida: ${time}.`);
    parts.push("¿Podrían confirmarme disponibilidad? Gracias.");
    message = parts.join("\n");
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Abre WhatsApp en una nueva pestaña con el mensaje.
 */
export function openWhatsApp(options: WhatsAppMessageOptions): void {
  const url = buildWhatsAppURL(options);
  window.open(url, "_blank", "noopener,noreferrer");
}
