'use client';

// Landing de VisualTime TDAH — compuesta desde el kit canónico de
// plantillas-codigo/landing/ (estructura inmutable, 19-PAGINA-DE-VENTAS.md).
// Todo el copy sale de docs/copy/landing.md (marcado, trazado a FICHA-AVATAR.md).
// Tokens visuales: components/landing/tokens.css, tematizado con FICHA-ARTE.md (Opción B).

import { Lock, BellOff, Smartphone, RefreshCcw } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Problema } from '@/components/landing/Problema';
import { Agitacion } from '@/components/landing/Agitacion';
import { Solucion } from '@/components/landing/Solucion';
import { AppPorDentro } from '@/components/landing/AppPorDentro';
import { Oferta } from '@/components/landing/Oferta';
import { Garantia } from '@/components/landing/Garantia';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FooterLegal } from '@/components/landing/FooterLegal';
import { StickyCtaMobile } from '@/components/landing/ui';

// Modelo onboarding-first (decidido en Sesión 1, ESTADO.md): hard paywall pero
// el CTA de la landing lleva a /onboarding, nunca directo al checkout de Hotmart.
const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Empezar gratis 7 días';

export default function LandingVisualTimeTDAH() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="VisualTime TDAH"
        loginHref="/entrar"
        h1Marked="La agenda que te [acento]regala[/acento] repetir tus rutinas"
        subtitleMarked="Tu día en una [b]línea de tiempo[/b] clara, sin pagar de más."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>Garantía de 15 días respaldada por Hotmart — sin preguntas</span>}
        visualPlaceholderSugerencia="captura de la línea de tiempo del día con la Rutina de Mañana Exitosa ya armada"
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena conocido?"
        preguntas={[
          { icon: Lock, textoMarked: '¿Te cobraron por algo tan básico como [b]repetir una tarea[/b]?' },
          { icon: BellOff, textoMarked: 'Una app te dejó sin alarma justo cuando más la necesitabas' },
          { icon: Smartphone, textoMarked: 'Perdiste tu progreso al cambiar de teléfono' },
          { icon: RefreshCcw, textoMarked: 'Terminaste usando el calendario del teléfono, sin ganas de intentar otra vez' },
        ]}
      />

      {/* 3. AGITACIÓN */}
      <Agitacion
        frases={[
          'Pagas suscripciones que [b]no terminas usando[/b].',
          'Cada reinicio se siente [acento]más difícil[/acento] que el anterior.',
          'El agotamiento de planificar tu día desde cero [b]se acumula[/b], semana tras semana.',
        ]}
        contraste={{
          labelHoy: 'Hoy',
          hoy: 'Listas infinitas, apps a medias y rutinas que empiezas de cero cada semana.',
          labelFuturo: 'En 3 meses, si nada cambia',
          futuro: 'El mismo ciclo — con más apps abandonadas en el camino.',
        }}
      />

      {/* 4. SOLUCIÓN — mecanismo bautizado: Rutina Regalada */}
      <Solucion
        tituloMarked="Conoce [acento]Rutina Regalada[/acento]"
        mecanismo="Rutina Regalada"
        bigIdeaMarked="Arma tu rutina una vez. [b]Se repite sola[/b], gratis, todos los días."
        pasos={[
          { titulo: 'Eliges una plantilla', detalle: 'O armas tu rutina desde cero, sin fricción.' },
          { titulo: 'La marcas como recurrente', detalle: 'Gratis desde el plan más básico — nunca bloqueada.' },
          { titulo: 'Se repite sola', detalle: 'Aparece en tu línea de tiempo cada día, sin volver a escribirla.' },
        ]}
        antesDespues={{
          labelAntes: 'Antes',
          antes: 'Reescribir "ir al gimnasio" cada semana, a mano.',
          labelDespues: 'Después',
          despues: 'Tu rutina ya está ahí, todos los días, gratis.',
        }}
      />

      {/* 5. LA APP POR DENTRO — placeholders honestos hasta tener screenshots reales (Sesión 5) */}
      <AppPorDentro
        tituloMarked="Así se ve [acento]tu día[/acento] por dentro"
        frames={[
          { label: 'Tu línea de tiempo de hoy', nombrePantalla: 'Hoy' },
          { label: 'Elige tu plantilla en 1 toque', nombrePantalla: 'Rutina de Mañana Exitosa' },
          { label: 'Tu racha y tus medallas', nombrePantalla: 'Progreso' },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6. OFERTA — anual primero, trial de 7 días (FICHA-MERCADO.md) */}
      <Oferta
        tituloMarked="Un precio [acento]justo[/acento], en tu moneda"
        trialDias={7}
        stack={{
          lineas: [
            { resultado: 'VisualTime TDAH Pro (12 meses)', valor: '$59.88' },
            { resultado: 'Rutinas recurrentes ilimitadas, incluidas', valor: '$0' },
            { resultado: 'Plantilla "Rutina de Mañana Exitosa"', valor: '$9' },
          ],
          totalTachado: '$68.88',
          nota: 'Hoy: $2.49/mes (se cobra $29.99/año)',
        }}
        anual={{
          nombre: 'Anual',
          badge: 'MÁS POPULAR',
          precioMes: '$2.49',
          totalAnual: 'Se cobra $29.99/año',
          ahorro: '2 meses gratis',
          descomposicionDia: 'menos de $0.09 al día',
          ctaLabel: 'Empezar mis 7 días gratis',
          ctaHref: CTA_HREF,
          features: [
            'Línea de tiempo visual de tu día',
            'Rutinas recurrentes incluidas, sin límite',
            'Alarmas nativas de tu teléfono',
            'Racha, medallas y % de progreso',
          ],
        }}
        mensual={{
          nombre: 'Mensual',
          precioMes: '$4.99',
          ctaLabel: CTA_LABEL,
          ctaHref: CTA_HREF,
          features: [
            'Línea de tiempo visual de tu día',
            'Rutinas recurrentes incluidas, sin límite',
            'Alarmas nativas de tu teléfono',
            'Cancelas cuando quieras',
          ],
        }}
      />

      {/* 7. GARANTÍA — FICHA-MERCADO.md: Prueba 7 días / Garantía 15 días */}
      <Garantia
        nombre="la Garantía de Tu Primera Rutina"
        condicionMarked="Si en 15 días no sientes que tu día por fin tiene orden, escribes un correo y te devolvemos todo. [b]Sin preguntas[/b]."
        pisoLegal="Garantía de 15 días desde tu primer cobro, respaldada por Hotmart"
      />

      {/* 8. FAQ — objeciones literales de FICHA-AVATAR.md */}
      <Faq
        items={[
          {
            pregunta: '¿Me van a cobrar después de que me acostumbre?',
            respuestaMarked:
              'No: te avisamos antes del día 7, y [b]puedes cancelar en un toque[/b] antes del cobro.',
          },
          {
            pregunta: '¿Para qué pagar si el calendario del teléfono es gratis?',
            respuestaMarked:
              'El calendario no motiva ni regala tus rutinas. Nosotros sí, [b]desde el plan más básico[/b].',
          },
          {
            pregunta: '¿Las alarmas suenan de verdad?',
            respuestaMarked:
              'Sí — notificaciones nativas de tu teléfono, sin depender de que la app esté abierta.',
          },
          {
            pregunta: '¿Pierdo todo si cambio de teléfono?',
            respuestaMarked:
              'Hoy el respaldo es manual — te lo decimos honesto, [b]sin prometer de más[/b].',
          },
          {
            pregunta: '¿Voy a poder cancelar fácil?',
            respuestaMarked: 'Sí, desde la app, sin llamadas ni formularios.',
          },
        ]}
      />

      {/* 9. CTA FINAL */}
      <CtaFinal
        h2Marked="Imagina abrir tu día y [acento]ya saber[/acento] qué sigue"
        futurePacingMarked="Sin reescribir nada. Sin empezar de cero cada mañana — tu rutina ya está ahí."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        recap="7 días gratis · desde $2.49/mes · garantía de 15 días"
        psMarked="PD: cada día que esperas es un día más organizando tu rutina desde cero. Tu primera rutina gratis te toma menos de 5 minutos."
      />

      {/* 10. FOOTER LEGAL */}
      <FooterLegal
        appName="VisualTime TDAH"
        soporteEmail="soporte@visualtimetdah.app"
        enlaces={[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos y Condiciones', href: '/terminos' },
          { label: 'Reembolsos', href: '/reembolsos' },
        ]}
      />

      <StickyCtaMobile labelComercial={CTA_LABEL} href={CTA_HREF} />
    </div>
  );
}
