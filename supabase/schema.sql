-- VisualTime TDAH — esquema de SERVIDOR.
-- Las rutinas y los "completados" del día a día SIGUEN 100% en localStorage (ESTADO.md) — el
-- usuario los ve y los edita solo ahí. Lo que SÍ vive aquí, desde 2026-11-19 (decisión explícita
-- del usuario, ver ESTADO.md "alarmas nativas"), es un ESPEJO mínimo del horario (solo hora,
-- título y días — nunca el detalle de "completados") para poder mandar la notificación push a la
-- hora exacta aunque el teléfono tenga la app cerrada. La Política de Privacidad se actualizó
-- para declarar esto.
--
-- Cómo correr esto: Supabase Dashboard → SQL Editor → pega todo → Run. Una sola vez
-- (es seguro volver a correrlo: todo usa IF NOT EXISTS).

create table if not exists processed_events (
  event_id     text primary key,
  event_type   text not null,
  payload_hash text,
  processed_at timestamptz not null default now()
);

create table if not exists webhook_log (
  id          bigserial primary key,
  event_id    text,
  type        text,
  result      text not null check (result in ('applied', 'duplicate', 'illegal', 'unauthorized', 'error')),
  received_at timestamptz not null default now()
);

create index if not exists webhook_log_received_idx on webhook_log (received_at desc);
create index if not exists webhook_log_result_idx on webhook_log (result, received_at desc);

alter table processed_events enable row level security;
alter table webhook_log enable row level security;
-- Sin "create policy": nadie con anon/authenticated puede leer ni escribir. Solo service_role (bypassa RLS).

-- ── Alarmas push (desde aquí, tablas NUEVAS — 2026-11-19) ──────────────────────────────────────
-- A diferencia de las tablas de arriba, estas SÍ tienen políticas: el navegador del propio
-- usuario (con su sesión, la clave pública) las lee y escribe directamente — nunca otro usuario.

create table if not exists push_subscriptions (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  endpoint    text not null unique,
  p256dh      text not null,
  auth_key    text not null,
  created_at  timestamptz not null default now()
);
create index if not exists push_subscriptions_user_idx on push_subscriptions (user_id);
alter table push_subscriptions enable row level security;

create policy "usuarios ven sus propias suscripciones push"
  on push_subscriptions for select
  using ((select auth.uid()) = user_id);
create policy "usuarios crean sus propias suscripciones push"
  on push_subscriptions for insert
  with check ((select auth.uid()) = user_id);
create policy "usuarios borran sus propias suscripciones push"
  on push_subscriptions for delete
  using ((select auth.uid()) = user_id);

-- Espejo MÍNIMO del horario — solo lo necesario para decidir cuándo avisar (hora, título, días
-- de la semana). NUNCA se guarda aquí si el bloque está completado o no (eso sigue local).
create table if not exists rutinas_notificaciones (
  user_id     uuid primary key references auth.users(id) on delete cascade,
  bloques     jsonb not null default '[]'::jsonb,
  zona_horaria text not null default 'America/Santiago',
  updated_at  timestamptz not null default now()
);
alter table rutinas_notificaciones enable row level security;

create policy "usuarios ven su propio horario de avisos"
  on rutinas_notificaciones for select
  using ((select auth.uid()) = user_id);
create policy "usuarios crean su propio horario de avisos"
  on rutinas_notificaciones for insert
  with check ((select auth.uid()) = user_id);
create policy "usuarios actualizan su propio horario de avisos"
  on rutinas_notificaciones for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "usuarios borran su propio horario de avisos"
  on rutinas_notificaciones for delete
  using ((select auth.uid()) = user_id);

-- Idempotencia: evita mandar el mismo bloque dos veces el mismo día (el cron corre cada pocos
-- minutos). Solo el cron (service_role) la toca — sin políticas, deny-by-default.
create table if not exists notificaciones_enviadas (
  user_id     uuid not null references auth.users(id) on delete cascade,
  bloque_id   text not null,
  fecha       date not null,
  enviado_at  timestamptz not null default now(),
  primary key (user_id, bloque_id, fecha)
);
alter table notificaciones_enviadas enable row level security;
