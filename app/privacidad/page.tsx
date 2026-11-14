export default function Privacidad() {
  return (
    <main className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto w-full max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold [font-family:var(--font-display)]">
          Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Última actualización: 14 de noviembre de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-base leading-relaxed text-[var(--text-secondary)]">
          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Quién es el responsable de tus datos
            </h2>
            <p className="mt-2">
              VisualTime TDAH es operado por Giogerson, desde Chile. Para
              cualquier duda o solicitud sobre tus datos, escribe a{" "}
              <a
                href="mailto:soporte@visualtimetdah.app"
                className="text-[var(--accent)] underline"
              >
                soporte@visualtimetdah.app
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Qué datos guardamos
            </h2>
            <p className="mt-2">
              Tus rutinas y tareas viven{" "}
              <strong className="text-[var(--text-primary)]">
                directamente en tu teléfono
              </strong>
              , no en nuestros servidores. No tenemos acceso a tus tareas,
              horarios ni notas personales.
            </p>
            <p className="mt-2">
              Para que puedas entrar a tu cuenta guardamos, en un servicio
              externo (Supabase): tu correo electrónico, el proveedor con el
              que entras (correo o tu cuenta de Google — en ese caso, tu
              nombre y la foto de tu perfil de Google), y el estado de tu
              suscripción. Nada de esto incluye tus rutinas.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Con quién compartimos datos
            </h2>
            <p className="mt-2">Trabajamos con estos proveedores, cada uno con una función específica:</p>
            <ul className="mt-2 flex flex-col gap-1.5 pl-5 [list-style:disc]">
              <li>
                <strong className="text-[var(--text-primary)]">Supabase</strong> — guarda tu
                correo y gestiona que puedas iniciar sesión.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Google</strong> — si eliges
                entrar con tu cuenta de Google, comparte con nosotros tu correo, nombre y foto
                de perfil para identificarte.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Hotmart</strong> — procesa tu
                pago. Nosotros recibimos tu correo y el estado de tu suscripción (activa, en
                prueba, cancelada) para darte acceso — nunca el número de tu tarjeta.
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">Vercel</strong> — aloja la
                app en internet.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Tus datos pueden procesarse fuera de tu país
            </h2>
            <p className="mt-2">
              Supabase procesa tu correo y tu sesión en servidores ubicados en Estados Unidos.
              Esto es necesario para que el servicio de inicio de sesión funcione, y esos
              proveedores están obligados por sus propios términos a proteger tu información.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Respaldo de tus datos
            </h2>
            <p className="mt-2">
              Hoy tus rutinas viven solo en tu teléfono. Si lo formateas o
              cambias de equipo sin hacer un respaldo manual, pierdes tu
              información — te lo decimos honesto, sin prometer de más.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Tus derechos
            </h2>
            <p className="mt-2">
              Puedes pedirnos acceder, corregir o eliminar tu cuenta y los datos de
              suscripción asociados (correo, estado de suscripción, datos de tu
              cuenta de Google si entraste así) escribiendo a{" "}
              <a
                href="mailto:soporte@visualtimetdah.app"
                className="text-[var(--accent)] underline"
              >
                soporte@visualtimetdah.app
              </a>
              . Respondemos y eliminamos tus datos en un plazo razonable desde tu
              solicitud.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--text-primary)]">
              Si cambiamos esta política
            </h2>
            <p className="mt-2">
              Si hacemos un cambio importante, te avisamos por correo antes de que
              entre en vigencia — nunca cambiamos las reglas en silencio.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
