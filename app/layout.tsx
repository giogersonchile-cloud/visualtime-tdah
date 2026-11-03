import type { Metadata } from "next";
import { Gantari, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const gantari = Gantari({
  variable: "--font-gantari",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "VisualTime TDAH — Tu rutina, gratis para siempre",
  description:
    "El planificador visual diario que te regala repetir tus rutinas. Hecho para TDAH, sin pagar de más por lo básico.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${gantari.variable} ${atkinson.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
