// Envío de correos transaccionales propios (fuera del login, que ya lo maneja Supabase vía
// SMTP de Resend). Usa la API REST directa — sin el SDK, un fetch basta para esto.
const REMITENTE = 'VisualTime TDAH <acceso@mail.visualtimetdah.com>';

export async function enviarCorreo(params: { to: string; subject: string; html: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('Falta RESEND_API_KEY — el servidor no puede mandar este correo.');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: REMITENTE, to: params.to, subject: params.subject, html: params.html }),
  });
  if (!res.ok) {
    const texto = await res.text();
    throw new Error(`Resend respondió ${res.status}: ${texto}`);
  }
}
