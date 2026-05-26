// ═══════════════════════════════════════════════
// 🔔 SPOBU SERVICE WORKER - push notifications (v3)
// Failas turi būti šaknyje šalia index.html
// ═══════════════════════════════════════════════

const APP_URL = 'https://elfuego-hub.github.io/spobu/';

// Paverčia bet kokį URL į teisingą app'o URL
function resolveUrl(u) {
  if (!u || u === '/' || u === '') return APP_URL;
  // Jei pilnas URL su http - palikti
  if (u.indexOf('http') === 0) return u;
  // Reliatyvus - prikabinti prie APP_URL
  return APP_URL;
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// 📨 Push žinutės gavimas
self.addEventListener('push', (event) => {
  event.waitUntil((async () => {
    let title = 'SPOBU';
    let body = '';
    let url = APP_URL;

    try {
      if (event.data) {
        const data = event.data.json();
        title = data.title || 'SPOBU';
        body = data.body || '';
        url = resolveUrl(data.url);
      }
    } catch (e) {
      try { body = event.data ? event.data.text() : ''; } catch (e2) {}
    }

    await self.registration.showNotification(title, {
      body: body,
      tag: 'spobu-' + Date.now(),
      data: { url: url },
      requireInteraction: false,
      silent: false,            // garsas ĮJUNGTAS (OS standartinis pranešimo garsas)
      vibrate: [120, 60, 120],  // vibracijos raštas
    });
  })());
});

// 👆 Paspaudus pranešimą - atidaryti app'ą
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = resolveUrl(
    event.notification.data && event.notification.data.url
  );

  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });
    // Jei app'as jau atidarytas - į jį
    for (const client of clients) {
      if ('focus' in client) {
        await client.focus();
        return;
      }
    }
    // Kitaip - atidaryti naują
    if (self.clients.openWindow) {
      await self.clients.openWindow(targetUrl);
    }
  })());
});
