// ═══════════════════════════════════════════════
// 🔔 SPOBU SERVICE WORKER - push notifications (v2)
// Failas turi būti šaknyje šalia index.html
// ═══════════════════════════════════════════════

const APP_URL = 'https://elfuego-hub.github.io/spobu/';

// Service Worker iškart aktyvuojasi
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 📨 Push žinutės gavimas
self.addEventListener('push', (event) => {
  // SVARBU iOS: visas darbas turi būti event.waitUntil viduje
  event.waitUntil((async () => {
    let title = 'SPOBU';
    let body = '';
    let url = APP_URL;

    try {
      if (event.data) {
        const data = event.data.json();
        title = data.title || 'SPOBU';
        body = data.body || '';
        url = data.url || APP_URL;
      }
    } catch (e) {
      try { body = event.data ? event.data.text() : ''; } catch (e2) {}
    }

    // Notification BE ikonos - iOS atmeta jei ikona nurodyta bet neegzistuoja
    await self.registration.showNotification(title, {
      body: body,
      tag: 'spobu-' + Date.now(),
      data: { url: url },
      requireInteraction: false,
    });
  })());
});

// 👆 Paspaudus pranešimą - atidaryti app'ą
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || APP_URL;

  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    for (const client of clients) {
      if ('focus' in client) {
        await client.focus();
        return;
      }
    }
    if (self.clients.openWindow) {
      await self.clients.openWindow(targetUrl);
    }
  })());
});
