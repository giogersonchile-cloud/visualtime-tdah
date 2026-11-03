export default function Privacidad() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold [font-family:var(--font-display)]">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Última actualización: noviembre de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Qué datos guardamos
            </h2>
            <p className="mt-2">
              VisualTime TDAH guarda tus rutinas y tareas{" "}
              <strong className="text-[var(--text-primary)]">
                directamente en tu teléfono
              </strong>
              , no en nuestros servidores. No tenemos acceso a tus tareas,
              horarios ni notas personales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Qué datos recibe nuestro proveedor de pago
            </h2>
            <p className="mt-2">
              Cuando te suscribes, tu pago lo procesa Hotmart. Nosotros
              recibimos tu correo electrónico y el estado de tu suscripción
              (activa, en prueba, cancelada) para darte acceso a la app —
              nunca el número de tu tarjeta.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Respaldo de tus datos
            </h2>
            <p className="mt-2">
              Hoy tus datos viven solo en tu teléfono. Si lo formateas o
              cambias de equipo sin hacer un respaldo manual, pierdes tu
              información — te lo decimos honesto, sin prometer de más.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Tus derechos
            </h2>
            <p className="mt-2">
              Puedes pedirnos que eliminemos tu cuenta y los datos de
              suscripción asociados escribiendo a{" "}
              <a
                href="mailto:soporte@visualtimetdah.app"
                className="text-[var(--accent)] underline"
              >
                soporte@visualtimetdah.app
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
