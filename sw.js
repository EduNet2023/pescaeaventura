// Service Worker para EduNet Pesca e Aventura PWA
console.log("Service Worker: Arquivo sw.js carregado.");
const CACHE_NAME = 'edunet-pesca-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/banner.jpg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
  console.log('🔧 Service Worker: Evento de instalação disparado.');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('📦 Service Worker: Cache aberto. Adicionando arquivos...');
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        console.log('✅ Service Worker: Todos os arquivos foram cacheados.');
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.error('❌ Service Worker: Erro na instalação:', error);
      })
  );
});

// Ativar Service Worker
self.addEventListener('activate', function(event) {
  console.log('🚀 Service Worker: Evento de ativação disparado.');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      console.log('✅ Service Worker: Ativado e pronto para controlar clientes.');
      return self.clients.claim();
    }).catch(function(error) {
      console.error('❌ Service Worker: Erro na ativação:', error);
    })
  );
});

// Interceptar requisições
self.addEventListener('fetch', function(event) {
  console.log('📡 Service Worker: Interceptando requisição:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - retorna resposta do cache
        if (response) {
          console.log('📋 Service Worker: Servindo do cache:', event.request.url);
          return response;
        }

        // Clone da requisição
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Verificar se recebemos uma resposta válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              console.log('⚠️ Service Worker: Resposta inválida ou não básica para cache:', event.request.url);
              return response;
            }

            // Clone da resposta
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
                console.log('💾 Service Worker: Adicionado ao cache:', event.request.url);
              });

            console.log('🌐 Service Worker: Servindo da rede:', event.request.url);
            return response;
          }
        ).catch(function(error) {
          console.error('❌ Service Worker: Erro na requisição de rede:', event.request.url, error);
          // Se falhar, tentar servir página offline básica
          if (event.request.destination === 'document') {
            console.log('Offline: Tentando servir index.html do cache.');
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Sincronização em background
self.addEventListener('sync', function(event) {
  console.log('🔄 Service Worker: Evento de sincronização em background disparado:', event.tag);
  if (event.tag === 'background-sync') {
    console.log('🔄 Service Worker: Sincronização em background.');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Aqui você pode implementar sincronização de dados
  // Por exemplo, enviar dados de visitantes para um servidor
  console.log('⚙️ Service Worker: Executando sincronização em background...');
  return Promise.resolve();
}

// Notificações push (opcional)
self.addEventListener('push', function(event) {
  console.log('📬 Service Worker: Push recebido.');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova atualização disponível!',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Marés',
        icon: '/icon-192.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/icon-192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('EduNet Pesca e Aventura', options)
  );
});

// Clique em notificação
self.addEventListener('notificationclick', function(event) {
  console.log('🔔 Service Worker: Notificação clicada.');
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/#mare')
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

