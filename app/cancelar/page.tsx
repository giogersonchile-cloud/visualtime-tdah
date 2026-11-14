export default function Cancelar() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold [font-family:var(--font-display)]">
          Cómo cancelar tu suscripción
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Última actualización: 14 de noviembre de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <p>
              Cancelar es fácil y sin trucos: lo haces tú mismo, en 1 minuto,
              directamente donde pagaste.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Pasos
            </h2>
            <ol className="mt-2 flex flex-col gap-2 pl-5 [list-style:decimal]">
              <li>
                Entra a{" "}
                <a
                  href="https://app.hotmart.com/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline"
                >
                  app.hotmart.com
                </a>{" "}
                con el mismo correo con el que compraste VisualTime TDAH.
              </li>
              <li>Busca la sección &quot;Mis compras&quot; o &quot;Mi cuenta&quot;.</li>
              <li>Encuentra VisualTime TDAH en tu lista de suscripciones.</li>
              <li>
                Selecciona &quot;Cancelar suscripción&quot; y confirma.
              </li>
            </ol>
          </section>

          <section>
            <p>
              En cuanto canceles, dejas de ser cobrado desde tu próximo
              período — seguirás teniendo acceso hasta el final del período ya
              pagado. No se te cobra nada más después.
            </p>
          </section>

          <section>
            <p>
              Si te trabaste en algún paso, escríbenos a{" "}
              <a
                href="mailto:soporte@visualtimetdah.app"
                className="text-[var(--accent)] underline"
              >
                soporte@visualtimetdah.app
              </a>{" "}
              y te ayudamos directamente — nunca te pedimos que te quedes.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
