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
};

export default nextConfig;
