// Service worker de VisualTime TDAH — SOLO maneja notificaciones push. No cachea nada (sin
// soporte offline todavía): su único trabajo es recibir el aviso del servidor y mostrarlo,
// incluso con la app cerrada.

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: 'VisualTime TDAH', body: event.data ? event.data.text() : '' };
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'VisualTime TDAH', {
      body: data.body || '',
      icon: '/favicon.ico',
      tag: data.tag,
      data: { url: data.url || '/app' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url || '/app';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(url) && 'focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow(url);
    }),
  );
});
