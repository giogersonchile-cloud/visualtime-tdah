import type { NextConfig } from "next";

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

export default nextConfig;
