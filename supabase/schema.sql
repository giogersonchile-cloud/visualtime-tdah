-- VisualTime TDAH — esquema mínimo de SERVIDOR para el webhook de Hotmart (18-VENTA-HOTMART.md).
-- La app NO guarda rutinas/completados aquí (eso sigue 100% en localStorage, ESTADO.md).
-- Estas tablas solo existen para que el webhook sea seguro: autenticidad + frescura + IDEMPOTENCIA.
-- Se accede SOLO con la service_role key, desde el servidor (nunca desde el navegador) — por eso
-- tienen RLS activo y CERO políticas: deny-by-default también si alguna clave pública las tocara.
--
-- Cómo correr esto: Supabase Dashboard → SQL Editor → pega todo → Run. Una sola vez.

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
