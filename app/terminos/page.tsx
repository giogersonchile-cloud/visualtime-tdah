export default function Terminos() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold [font-family:var(--font-display)]">
          Términos y Condiciones
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Última actualización: noviembre de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Qué es VisualTime TDAH
            </h2>
            <p className="mt-2">
              VisualTime TDAH es una herramienta personal de organización
              diaria. No reemplaza diagnóstico, tratamiento ni consejo
              médico — si necesitas ayuda profesional, consulta a un
              especialista.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Tu suscripción
            </h2>
            <p className="mt-2">
              Ofrecemos una prueba gratuita de 7 días. Al terminar, tu plan
              se cobra automáticamente según el precio vigente al momento de
              suscribirte, salvo que canceles antes. Puedes cancelar en
              cualquier momento desde la app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Uso aceptable
            </h2>
            <p className="mt-2">
              No está permitido usar la app para fines distintos a tu
              organización personal, ni intentar vulnerar su funcionamiento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Contacto
            </h2>
            <p className="mt-2">
              Para dudas sobre estos términos, escríbenos a{" "}
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
