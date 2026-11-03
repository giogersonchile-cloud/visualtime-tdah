import { TabBar } from '@/components/app/TabBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bg)] [font-family:var(--font-body)]">
      {/* Fondo con profundidad (mesh del acento) — consistente con el resto del funnel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(760px 420px at 90% -10%, color-mix(in oklab, var(--accent) 14%, transparent) 0%, transparent 60%), radial-gradient(620px 420px at -5% 40%, color-mix(in oklab, var(--accent-2) 10%, transparent) 0%, transparent 55%)',
        }}
      />
      <main className="mx-auto w-full max-w-[520px] flex-1 px-4 pb-6 pt-5">{children}</main>
      <TabBar />
    </div>
  );
}
