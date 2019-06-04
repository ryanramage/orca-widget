"use strict";var precacheConfig=[["entry.87c11fe2.js","39a587eb2797f4f2af44e1856345931c"],["entry.99e9c7a3.js","cb4ae8fc43eaa1963a3cfe02393988ca"],["entry.cff58bcf.js","1b164f5003d974efc551a6fa425daa85"],["entry.dd3330d4.js","0f323415101c828f93441e9bbbaeb148"],["fonts.3ef365b7.css","02ed21ee78a45d352cb38964c51bdbea"],["fonts.3ef365b7.js","6457beaae6efbb4cf920a3be9f3fa7f1"],["fonts.bf36ba62.css","691dd02cadb2ce21829b9690bb2a93ac"],["index.html","b41f99d5ef665d207610ab07b8b428f8"],["index.js","3eede07b9924dc3faf6cf9a7b0f5b678"],["input_mono_medium.b9f8b051.ttf","e713a7fdd207c514f5d17144a52e8094"],["input_mono_medium.e1b419e1.ttf","e713a7fdd207c514f5d17144a52e8094"],["main.05de8699.css","6ad692abb16cc43e98bcfc0072e02741"],["main.274a1d4b.css","82644077efdf81071ce3883e5acfa5c9"],["main.274a1d4b.js","6030854c27cf2a662692d8dbd8f57f0a"],["main.8806ad7a.css","e9927a80a55eb47c3043ae0a814381ff"],["main.e862a416.css","04fe3ee1797ddf810f9a4f5917600568"],["main.e862a416.js","5320692fafdd1c4f7a744451d70251a5"],["manifest.js","84f9704bdd780a7d223c21d0e3dad843"],["reset.9d39e705.css","a8efedd52a84dcb6ff1e21d5a33ec5eb"],["reset.a5c900b8.css","b4e38b85a31b83607e5a90ebba2d1427"],["reset.a5c900b8.js","8048ed5bce17f4a382c9776bcd9b2cf5"],["service-worker.js","1eaeb70ee1a4208981580b6eb9c9118b"],["sw.js","8de0e053f2ca00f8d83e52ac8eebf50a"],["theme.1b882853.css","b2d1bc4bb0121e8fa477923b972a51f3"],["theme.1b882853.js","7791fb0d74ca2ad3c8fe2892df6d7e79"],["theme.b225d49c.css","28be40d005ee88a52fa066e35990ce5b"],["theme.e9924d54.css","1fbd4ec645dac3133caefc705600777c"],["theme.e9924d54.js","575e4c9e13478fd56b4ac803a88309cb"],["theme.fdf9dc99.css","e0efdba332d0df2a89a76c19c70b39f0"],["timer.3438a9a2.js","edd47c9af9e98de962c4fe908421bcb2"]],cacheName="sw-precache-v3-awesome-cache-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),r.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),r=createCacheKey(n,hashParamName,t,!1);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});