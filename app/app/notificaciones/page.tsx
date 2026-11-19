'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Bell, BellOff, Smartphone } from 'lucide-react';
import { obtenerRutina } from '@/lib/rutina';
import {
  activarNotificaciones,
  desactivarNotificaciones,
  estadoNotificaciones,
  hayActivas,
  sincronizarRutinaServidor,
  type EstadoNotificaciones,
} from '@/lib/push';

export default function Notificaciones() {
  const router = useRouter();
  const [soporte, setSoporte] = useState<EstadoNotificaciones>('inactivo');
  const [activo, setActivo] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [procesando, setProcesando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setSoporte(estadoNotificaciones());
    hayActivas().then((v) => {
      setActivo(v);
      setCargando(false);
    });
  }, []);

  const activar = async () => {
    setProcesando(true);
    setErrorMsg('');
    const r = await activarNotificaciones();
    if (!r.ok) {
      setErrorMsg(r.error ?? 'No pudimos activar las notificaciones.');
      setProcesando(false);
      return;
    }
    const rutina = obtenerRutina();
    if (rutina) await sincronizarRutinaServidor(rutina);
    setActivo(true);
    setProcesando(false);
  };

  const desactivar = async () => {
    setProcesando(true);
    await desactivarNotificaciones();
    setActivo(false);
    setProcesando(false);
  };

  return (
    <div className="flex flex-col pb-16">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.push('/app/perfil')}
          aria-label="Volver a tu perfil"
          className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-button)] text-[var(--text-secondary)]"
        >
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <h1 className="text-[22px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
          Notificaciones y alarmas
        </h1>
      </div>

      {cargando ? (
        <div className="mt-6 h-32 animate-pulse rounded-[var(--radius-card)] bg-[var(--surface-2)]" aria-busy="true" />
      ) : soporte === 'no-soportado' ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 text-center">
          <Smartphone size={28} color="var(--text-secondary)" aria-hidden="true" />
          <p className="text-[14px] text-[var(--text-secondary)]">
            Tu navegador no soporta avisos push. En iPhone, agrega VisualTime TDAH a tu pantalla
            de inicio desde Safari primero — es el único modo en que Apple permite notificaciones.
          </p>
        </div>
      ) : soporte === 'denegado' ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 text-center">
          <BellOff size={28} color="var(--text-secondary)" aria-hidden="true" />
          <p className="text-[14px] text-[var(--text-secondary)]">
            Bloqueaste los avisos para este sitio antes. Actívalos desde los ajustes de
            notificaciones de tu navegador y vuelve aquí.
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-tertiary)_18%,transparent)] bg-[var(--surface)] p-5 text-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-[var(--chip-bg)]">
            {activo ? (
              <Bell size={24} color="var(--accent)" aria-hidden="true" />
            ) : (
              <BellOff size={24} color="var(--text-secondary)" aria-hidden="true" />
            )}
          </span>
          <div>
            <p className="text-[16px] font-semibold text-[var(--text-primary)]">
              {activo ? 'Tus avisos están activos' : 'Avisarte a la hora de cada bloque'}
            </p>
            <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
              {activo
                ? 'Te avisamos aunque la app esté cerrada.'
                : 'Guardamos solo la hora y el título de tus bloques en un servidor seguro, para poder avisarte — nunca lo que marcas como hecho.'}
            </p>
          </div>
          <button
            type="button"
            onClick={activo ? desactivar : activar}
            disabled={procesando}
            className={`flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] text-[15px] font-semibold disabled:opacity-60 ${
              activo
                ? 'border border-[color-mix(in_oklab,var(--text-tertiary)_30%,transparent)] text-[var(--text-primary)]'
                : 'bg-[var(--accent)] text-[var(--bg)]'
            }`}
          >
            {procesando ? 'Un momento…' : activo ? 'Desactivar avisos' : 'Activar avisos'}
          </button>
          {errorMsg && (
            <p role="alert" className="text-[13px] text-[var(--error)]">
              {errorMsg}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
