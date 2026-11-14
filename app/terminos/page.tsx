export default function Terminos() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold [font-family:var(--font-display)]">
          Términos y Condiciones
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Última actualización: 14 de noviembre de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Qué es VisualTime TDAH
            </h2>
            <p className="mt-2">
              VisualTime TDAH es una herramienta personal de organización
              diaria, operada por Giogerson desde Chile. No reemplaza
              diagnóstico, tratamiento ni consejo médico — si necesitas ayuda
              profesional, consulta a un especialista.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Edad mínima
            </h2>
            <p className="mt-2">
              VisualTime TDAH es para personas mayores de 18 años. Si tienes
              menos, pide a un adulto responsable que la use por ti.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Cómo entras a tu cuenta
            </h2>
            <p className="mt-2">
              Tu cuenta se activa automáticamente cuando compras en Hotmart.
              Para entrar, usas el mismo correo con el que compraste — por
              enlace de un solo uso o con tu cuenta de Google.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Tu suscripción
            </h2>
            <p className="mt-2">
              Ofrecemos una prueba gratuita de 7 días. Al terminar, tu plan se
              cobra automáticamente según el precio vigente al momento de
              suscribirte, salvo que canceles antes. La suscripción se renueva
              automáticamente cada período hasta que la canceles.
            </p>
            <p className="mt-2">
              Puedes cancelar cuando quieras, sin penalidad, desde tu cuenta
              de Hotmart. Ve los pasos en{" "}
              <a href="/cancelar" className="text-[var(--accent)] underline">
                cómo cancelar
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Uso aceptable
            </h2>
            <p className="mt-2">
              No está permitido usar la app para fines distintos a tu
              organización personal, ni intentar vulnerar su funcionamiento.
              Podemos suspender o cerrar cuentas que incumplan esto.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Límite de responsabilidad
            </h2>
            <p className="mt-2">
              VisualTime TDAH se ofrece &quot;tal cual&quot;, como una ayuda de
              organización. No garantizamos resultados específicos sobre tu
              productividad o bienestar, y no somos responsables por
              decisiones que tomes basándote en tu uso de la app.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Ley aplicable
            </h2>
            <p className="mt-2">
              Estos términos se rigen por las leyes de Chile. Cualquier
              disputa se resuelve ante los tribunales chilenos, salvo que la
              ley de tu país te dé un derecho distinto como consumidor.
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
