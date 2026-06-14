// ═══════════════════════════════════════════════
// 🔔 SPOBU SERVICE WORKER - push notifications (v4)
// Failas turi būti šaknyje šalia index.html (pavadinimas TIKSLIAI: sw.js)
// v4: tvirtesnis payload skaitymas (flat {title,body,url} IR {notification:{...}}),
//     kad telefone matytųsi tikras tekstas, o ne naršyklės „naujas pranešimas iš…"
// ═══════════════════════════════════════════════

const APP_URL = 'https://elfuego-hub.github.io/spobu/';

// Paverčia bet kokį URL į teisingą app'o URL
function resolveUrl(u) {
  if (!u || u === '/' || u === '') return APP_URL;
  if (typeof u === 'string' && u.indexOf('http') === 0) return u;
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
        let data = null;
        try { data = event.data.json(); } catch (_) { data = null; }
        if (data && typeof data === 'object') {
          // Palaikom kelis formatus: {title,body,url} ARBA {notification:{title,body}} ARBA {data:{...}}
          const n = data.notification || data.data || data;
          title = n.title || data.title || 'SPOBU';
          body  = n.body  || data.body  || data.message || '';
          url   = resolveUrl(n.url || data.url || (data.data && data.data.url));
        } else {
          // Ne-JSON payload — paimam tekstą kaip body
          try { body = event.data.text() || ''; } catch (_) {}
        }
      }
    } catch (e) {
      try { body = event.data ? event.data.text() : ''; } catch (e2) {}
    }

    // Jei kažkodėl tuščia — bent prasmingas tekstas (NE naršyklės default)
    if (!body) body = 'Atidaryk SPOBU programėlę';

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
