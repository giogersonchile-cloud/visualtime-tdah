import { redirect } from 'next/navigation';
import { TabBar } from '@/components/app/TabBar';
import { crearClienteSupabaseServidor } from '@/lib/supabase/server';

const ESTADOS_SIN_ACCESO = ['refunded', 'chargeback'];

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await crearClienteSupabaseServidor();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect('/login');

  const planStatus = (data.user.app_metadata as { plan_status?: string })?.plan_status;
  if (!planStatus || ESTADOS_SIN_ACCESO.includes(planStatus)) redirect('/paywall');

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bg)] [font-family:var(--font-body)]">
      {/* Fondo con profundidad (mesh del acento) — consistente con el resto del funnel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(820px 460px at 92% -10%, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 62%), radial-gradient(660px 460px at -8% 42%, color-mix(in oklab, var(--accent-2) 13%, transparent) 0%, transparent 56%)',
        }}
      />
      <main className="mx-auto w-full max-w-[520px] flex-1 px-4 pb-6 pt-5">{children}</main>
      <TabBar />
    </div>
  );
}
