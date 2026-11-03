export default function Reembolsos() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold [font-family:var(--font-display)]">
          Política de Reembolso
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Última actualización: noviembre de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              La Garantía de Tu Primera Rutina
            </h2>
            <p className="mt-2">
              Si dentro de los{" "}
              <strong className="text-[var(--text-primary)]">
                15 días
              </strong>{" "}
              desde tu primer cobro sientes que VisualTime TDAH no te sirvió,
              escríbenos y te devolvemos tu dinero. Sin preguntas, sin
              formularios.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Cómo pedirlo
            </h2>
            <p className="mt-2">
              Escribe a{" "}
              <a
                href="mailto:soporte@visualtimetdah.app"
                className="text-[var(--accent)] underline"
              >
                soporte@visualtimetdah.app
              </a>{" "}
              con el correo que usaste para suscribirte. El reembolso se
              procesa a través de Hotmart, nuestra pasarela de pago.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Tu prueba gratuita
            </h2>
            <p className="mt-2">
              Durante los primeros 7 días no se te cobra nada. Si cancelas
              antes de que termine la prueba, no se te cobra ni hay nada que
              reembolsar.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
