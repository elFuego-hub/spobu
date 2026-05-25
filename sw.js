// ═══════════════════════════════════════════════
// 🔔 SPOBU SERVICE WORKER - push notifications
// Failas turi būti šaknyje šalia index.html
// ═══════════════════════════════════════════════

// Service Worker iškart aktyvuojasi
self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// 📨 Push žinutės gavimas
self.addEventListener('push', (event) => {
  let data = { title: 'SPOBU', body: '', url: '/' };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {
    if (event.data) data.body = event.data.text();
  }

  const options = {
    body: data.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    vibrate: [120, 60, 120],
    tag: 'spobu-notify',
    renotify: true,
    data: { url: data.url || '/' },
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'SPOBU', options)
  );
});

// 👆 Paspaudus pranešimą - atidaryti app'ą
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        // Jei app'as jau atidarytas - į jį
        for (const client of clients) {
          if ('focus' in client) return client.focus();
        }
        // Kitaip - atidaryti naują
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});
