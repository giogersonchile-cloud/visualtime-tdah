import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs/config";

const nextConfig: NextConfig = {
  /* config options here */
  // Apaga el badge de desarrollo (círculo inferior-izquierdo): el revisor-visual lo
  // confundió con parte de la UI y contaminó la puntuación de craft/identidad.
  devIndicators: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Cabeceras de seguridad base (27-REVISION-SEGURIDAD.md A02 — faltaban por completo).
  // Sin CSP estricta: Next.js usa scripts inline para la hidratación y una CSP mal
  // puesta rompe la app sin poder probarla aquí contra producción — queda como
  // pendiente de hacer con cuidado (nonce-based), no improvisada sin verificar.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

// withSentryConfig solo sube source maps y crea "releases" si existen las variables
// SENTRY_ORG/SENTRY_PROJECT/SENTRY_AUTH_TOKEN (se agregan después, en Vercel, cuando
// se quiera ver el código fuente real del error — sin ellas, Sentry sigue funcionando
// igual, solo sin el detalle de línea exacta del código fuente).
export default withSentryConfig(nextConfig, {
  silent: true,
  widenClientFileUpload: true,
});
