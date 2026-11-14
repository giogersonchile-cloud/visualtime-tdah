# RUNBOOK — VisualTime TDAH

Qué hacer en los incidentes más probables. Síntoma → causa probable → acción inmediata.

| Síntoma | Causa probable | Acción inmediata |
|---|---|---|
| Un cliente pagó pero no tiene acceso | el webhook de Hotmart falló o Supabase rechazó la escritura | revisar `webhook_log` en Supabase (tabla, columna `result`) para ese correo; si dice `error`, revisar Sentry a la misma hora para el motivo exacto |
| Nadie puede entrar (ni con correo ni con Google) | Supabase caído, o `SUPABASE_SECRET_KEY`/`NEXT_PUBLIC_SUPABASE_*` mal puestas en Vercel | revisar el estado de Supabase (status.supabase.com); si las claves cambiaron, repetirlas en Vercel → Environment Variables → Redeploy |
| Pantalla blanca / la app no carga | el último deploy quedó roto | Vercel → Deployments → el deploy anterior que decía "Ready" → `⋯` → Redeploy (revierte en segundos) |
| El botón de pagar no lleva a Hotmart | el link de pago cambió o venció en Hotmart | Hotmart → Producto → Links de divulgación → copiar de nuevo la "Página de Pago" de cada plan y pegarla en `app/paywall/page.tsx` (`CHECKOUT_URL`) |
| Sentry no avisa nada pero un cliente dice que la app no abre | la app está caída y nadie más la visitó (Sentry solo ve errores, no caídas silenciosas) | revisar manualmente `https://www.visualtimetdah.com/api/health` — si no responde "ok", el sitio está caído; revisar Vercel |

## Vigilancia pendiente (no bloquea vender, hacerlo pronto)

No hay todavía un vigilante externo que avise solo si la app se cae sin que nadie la visite.
Pendiente: crear una cuenta gratis en UptimeRobot y apuntarla a
`https://www.visualtimetdah.com/api/health` cada 5 minutos, con alerta por correo/WhatsApp.

## Rollback

Vercel guarda cada versión publicada. Para volver a la anterior: Deployments → la versión buena →
menú `⋯` → **Promote to Production** (o **Redeploy**). No se pierde nada, es instantáneo.
