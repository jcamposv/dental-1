// Imágenes importadas desde src/assets/images/
// Reemplaza cualquier imagen con tus propias fotos manteniendo el mismo nombre de archivo
import heroImg from "../assets/images/header-demo-1.jpg";
import aboutImg from "../assets/images/consultorio.jpg";
import fillingImg from "../assets/images/rellenos-dentales-demo1.jpg";
import whiteningImg from "../assets/images/blanqueamiento-1.jpg";
import surgeryImg from "../assets/images/cirugia-demo-1.jpg";
import implantsImg from "../assets/images/implantes-demo1.jpg";
import doctor1 from "../assets/images/doctor-1.jpg";
import doctor2 from "../assets/images/doctor-2.jpg";
import doctor3 from "../assets/images/doctor-3.jpg";
import doctor4 from "../assets/images/doctor-4.jpg";
import review1 from "../assets/images/review-1.jpg";
import ninoImg from "../assets/images/dental-nino.jpg";
import adolescenteImg from "../assets/images/adolecente.jpg";
import adultoImg from "../assets/images/adulto-demo1.jpg";

export const siteConfig = {
  name: "Otto Dental",
  tagline: "Cuidado Dental Gentil Para Cada Sonrisa",
  description:
    "Atención dental premium con un toque gentil. Otto Dental ofrece tratamientos de vanguardia en un ambiente cálido y acogedor.",
  phone: "+1 (555) 234-5678",
  email: "hola@ottodental.com",
  address: "Av. de la Sonrisa 123, Suite 200, Ciudad de México",

  // ── WhatsApp ──
  // Cambia este número por el de tu clínica (formato internacional sin + ni espacios)
  whatsapp: {
    number: "15552345678",
    // Mensaje pre-llenado que aparece al abrir WhatsApp
    defaultMessage:
      "Hola, me gustaría agendar una cita en Otto Dental. ¿Podrían ayudarme?",
  },

  // ── Google Calendar ──
  // Para activar la integración con Google Calendar:
  // 1. Crea un proyecto en https://console.cloud.google.com
  // 2. Activa la Google Calendar API
  // 3. Crea credenciales OAuth 2.0 (Web application)
  // 4. Agrega las variables en .env (ver .env.example)
  googleCalendar: {
    enabled: false, // Cambia a true cuando tengas las credenciales
    calendarId: "primary", // o el ID del calendario de la clínica
  },

  social: {
    facebook: "#",
    instagram: "#",
    twitter: "#",
    linkedin: "#",
  },
  navigation: [
    { label: "Inicio", href: "#home" },
    { label: "Servicios", href: "#services" },
    { label: "Nosotros", href: "#about" },
    { label: "Especialistas", href: "#specialists" },
    { label: "Contacto", href: "#contact" },
  ],
} as const;

export const services = [
  {
    title: "Rellenos Dentales",
    description:
      "Restaura tus dientes con rellenos de composite duraderos y de aspecto natural que se integran perfectamente con tu sonrisa.",
    image: fillingImg,
  },
  {
    title: "Blanqueamiento Dental",
    description:
      "Logra una sonrisa más brillante y segura con nuestros tratamientos profesionales de blanqueamiento en consultorio y para llevar a casa.",
    image: whiteningImg,
  },
  {
    title: "Cirugía Oral",
    description:
      "Atención quirúrgica experta para extracciones, correcciones mandibulares y procedimientos dentales complejos con mínima molestia.",
    image: surgeryImg,
  },
  {
    title: "Implantes Dentales",
    description:
      "Reemplazos dentales permanentes y de aspecto natural que restauran tanto la función como la belleza de tu sonrisa.",
    image: implantsImg,
  },
] as const;

export const specialists = [
  {
    name: "Dra. Sarah Mitchell",
    specialty: "Ortodoncista",
    image: doctor1,
  },
  {
    name: "Dr. James Holloway",
    specialty: "Cirujano Dental",
    image: doctor2,
  },
  {
    name: "Dra. Elena Rivera",
    specialty: "Dentista Cosmética",
    image: doctor3,
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Dentista Pediátrico",
    image: doctor4,
  },
] as const;

export const testimonials = [
  {
    name: "Amanda Lawson",
    service: "Blanqueamiento Dental",
    text: "El equipo de Otto Dental hizo que mi experiencia de blanqueamiento fuera increíblemente cómoda. ¡Mi sonrisa nunca se había visto mejor — recibo cumplidos todos los días!",
    rating: 5,
    image: review1,
  },
  {
    name: "Roberto Nguyen",
    service: "Implantes Dentales",
    text: "Después de años de sentirme inseguro, mis nuevos implantes se ven completamente naturales. El personal fue profesional y atento durante todo el proceso.",
    rating: 5,
    image: review1,
  },
  {
    name: "Patricia Gómez",
    service: "Revisión General",
    text: "Encontrar un dentista en el que toda mi familia confíe era importante para mí. Otto Dental superó cada expectativa — desde la recepción hasta la silla.",
    rating: 5,
    image: review1,
  },
] as const;

export const audiences = [
  {
    title: "Niños",
    description:
      "Visitas dentales gentiles y divertidas que enseñan hábitos saludables desde temprana edad. Hacemos que cada niño se sienta seguro y cómodo.",
    image: ninoImg,
  },
  {
    title: "Adolescentes",
    description:
      "Brackets, alineadores y cuidado preventivo adaptado para sonrisas en crecimiento. La confianza comienza con una boca sana.",
    image: adolescenteImg,
  },
  {
    title: "Adultos",
    description:
      "Atención integral desde limpiezas rutinarias hasta tratamientos restaurativos avanzados. Tu sonrisa merece lo mejor en cada etapa.",
    image: adultoImg,
  },
] as const;

export { heroImg, aboutImg };
