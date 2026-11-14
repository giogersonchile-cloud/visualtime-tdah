# MANUAL DEL DUEÑO — VisualTime TDAH

Guía en simple de dónde vive todo y qué hacer en las situaciones más comunes. No necesitas saber
programar para usar este documento.

## Dónde vive cada cosa

| Qué | Dónde | Para qué |
|---|---|---|
| El código de tu app | GitHub `giogersonchile-cloud/visualtime-tdah` | Cada vez que se guarda un cambio, se publica solo |
| Tu app publicada | Vercel (`vercel.com/giogersonchile-cloud/visualtime-tdah`) | Aquí ves si algo falló al publicar y puedes revertir |
| Tu dominio | Namecheap (`visualtimetdah.com`) | Renovar antes de que venza |
| Las cuentas de tus clientes | Supabase (`tspjibbqokwxztfiicok`) | Login, y el estado de cada suscripción (`plan_status`) |
| Los pagos | Hotmart (producto ID `8898684`) | Ventas, reembolsos, cancelaciones, afiliados |
| Los correos que manda la app | Resend (`mail.visualtimetdah.com`) | Enlaces de acceso |
| Los errores de la app | Sentry (`visualtime-tdah.sentry.io`) | Te avisa si algo se rompe para un cliente real |

## Tareas comunes

**Un cliente dice que no puede entrar:**
1. Pídele el correo con el que compró.
2. En Supabase → Authentication → Users, busca ese correo.
3. Si no aparece, seguramente compró con un correo distinto al que está usando — pídele que
   confirme en Hotmart qué correo usó.
4. Si aparece pero dice "no tiene plan activo", revisa en Hotmart que su compra esté realmente
   aprobada (no pendiente ni rechazada).

**Un cliente pide un reembolso:**
- Se hace desde el panel de Hotmart (Ventas → esa compra → Reembolsar). El acceso del cliente se
  corta solo — el sistema lo escucha automáticamente.

**Un cliente quiere cancelar:**
- Dile que entre a `https://www.visualtimetdah.com/cancelar` — ahí están los pasos. No necesitas
  hacer nada tú.

**Algo se ve roto en la app:**
1. Entra a `https://visualtime-tdah.sentry.io/issues/` — ahí aparece el error exacto con la hora.
2. Si fue justo después de publicar un cambio, entra a Vercel → Deployments → el despliegue
   anterior (el que SÍ funcionaba) → menú `⋯` → **Redeploy**. Eso revierte en segundos.

**Quieres cambiar el precio:**
- Se cambia en Hotmart (el precio que ve un cliente NUEVO). Los que ya están suscritos siguen
  pagando el precio con el que entraron, salvo que tú decidas lo contrario.

## Antes de que venza algo

- Dominio `visualtimetdah.com`: revisar la fecha de renovación en Namecheap una vez al año.
- Sin suscripción paga de Supabase/Vercel todavía: si la app crece mucho, esos planes gratis
  tienen límites (ver sección de Escala en el certificado de pre-lanzamiento).

## Si necesitas ayuda técnica de nuevo

Vuelve a esta conversación con Claude Code y dile qué pasó — tiene memoria de todo este proyecto
en `ESTADO.md`.
