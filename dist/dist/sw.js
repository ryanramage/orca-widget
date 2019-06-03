// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"dist/sw.js":[function(require,module,exports) {
"use strict";

var precacheConfig = [["entry.87c11fe2.js", "58b460ca32eef305763a80d92cafa2a4"], ["entry.99e9c7a3.js", "cb4ae8fc43eaa1963a3cfe02393988ca"], ["entry.dd3330d4.js", "0f323415101c828f93441e9bbbaeb148"], ["fonts.3ef365b7.css", "02ed21ee78a45d352cb38964c51bdbea"], ["fonts.3ef365b7.js", "3b95268e11e1963574b6d8fda7470444"], ["fonts.bf36ba62.css", "691dd02cadb2ce21829b9690bb2a93ac"], ["index.html", "d93c5bdc47b862453f2bc3ec13c4a8a1"], ["index.js", "93f15e7c03fa120be294a1c08f47db71"], ["input_mono_medium.b9f8b051.ttf", "e713a7fdd207c514f5d17144a52e8094"], ["input_mono_medium.e1b419e1.ttf", "e713a7fdd207c514f5d17144a52e8094"], ["main.05de8699.css", "6ad692abb16cc43e98bcfc0072e02741"], ["main.274a1d4b.css", "82644077efdf81071ce3883e5acfa5c9"], ["main.274a1d4b.js", "bd4b79d97bb66284d610e66f8f71d4cb"], ["main.8806ad7a.css", "e9927a80a55eb47c3043ae0a814381ff"], ["main.e862a416.css", "04fe3ee1797ddf810f9a4f5917600568"], ["main.e862a416.js", "4e0d52b8fc2594c266b7b5298f3aecbe"], ["reset.9d39e705.css", "a8efedd52a84dcb6ff1e21d5a33ec5eb"], ["reset.a5c900b8.css", "b4e38b85a31b83607e5a90ebba2d1427"], ["reset.a5c900b8.js", "09e5abb3c1dcf129dd0e4d75f6b55ae5"], ["service-worker.js", "659cc6e6cce60e3a7ba7b3597b30bdfe"], ["sw.js", "0d1dac13a2291ca13f65184f7e29c284"], ["theme.1b882853.css", "b2d1bc4bb0121e8fa477923b972a51f3"], ["theme.1b882853.js", "43e9e4d320e4470f725135192eb602fb"], ["theme.b225d49c.css", "28be40d005ee88a52fa066e35990ce5b"], ["theme.e9924d54.css", "1fbd4ec645dac3133caefc705600777c"], ["theme.e9924d54.js", "738f142c25fb4a113693cbb60d640bb1"], ["theme.fdf9dc99.css", "e0efdba332d0df2a89a76c19c70b39f0"]],
    cacheName = "sw-precache-v3-awesome-cache-" + (self.registration ? self.registration.scope : ""),
    ignoreUrlParametersMatching = [/^utm_/],
    addDirectoryIndex = function addDirectoryIndex(e, t) {
  var a = new URL(e);
  return "/" === a.pathname.slice(-1) && (a.pathname += t), a.toString();
},
    cleanResponse = function cleanResponse(e) {
  return e.redirected ? ("body" in e ? Promise.resolve(e.body) : e.blob()).then(function (t) {
    return new Response(t, {
      headers: e.headers,
      status: e.status,
      statusText: e.statusText
    });
  }) : Promise.resolve(e);
},
    createCacheKey = function createCacheKey(e, t, a, n) {
  var r = new URL(e);
  return n && r.pathname.match(n) || (r.search += (r.search ? "&" : "") + encodeURIComponent(t) + "=" + encodeURIComponent(a)), r.toString();
},
    isPathWhitelisted = function isPathWhitelisted(e, t) {
  if (0 === e.length) return !0;
  var a = new URL(t).pathname;
  return e.some(function (e) {
    return a.match(e);
  });
},
    stripIgnoredUrlParameters = function stripIgnoredUrlParameters(e, t) {
  var a = new URL(e);
  return a.hash = "", a.search = a.search.slice(1).split("&").map(function (e) {
    return e.split("=");
  }).filter(function (e) {
    return t.every(function (t) {
      return !t.test(e[0]);
    });
  }).map(function (e) {
    return e.join("=");
  }).join("&"), a.toString();
},
    hashParamName = "_sw-precache",
    urlsToCacheKeys = new Map(precacheConfig.map(function (e) {
  var t = e[0],
      a = e[1],
      n = new URL(t, self.location),
      r = createCacheKey(n, hashParamName, a, !1);
  return [n.toString(), r];
}));

function setOfCachedUrls(e) {
  return e.keys().then(function (e) {
    return e.map(function (e) {
      return e.url;
    });
  }).then(function (e) {
    return new Set(e);
  });
}

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(cacheName).then(function (e) {
    return setOfCachedUrls(e).then(function (t) {
      return Promise.all(Array.from(urlsToCacheKeys.values()).map(function (a) {
        if (!t.has(a)) {
          var n = new Request(a, {
            credentials: "same-origin"
          });
          return fetch(n).then(function (t) {
            if (!t.ok) throw new Error("Request for " + a + " returned a response with status " + t.status);
            return cleanResponse(t).then(function (t) {
              return e.put(a, t);
            });
          });
        }
      }));
    });
  }).then(function () {
    return self.skipWaiting();
  }));
}), self.addEventListener("activate", function (e) {
  var t = new Set(urlsToCacheKeys.values());
  e.waitUntil(caches.open(cacheName).then(function (e) {
    return e.keys().then(function (a) {
      return Promise.all(a.map(function (a) {
        if (!t.has(a.url)) return e.delete(a);
      }));
    });
  }).then(function () {
    return self.clients.claim();
  }));
}), self.addEventListener("fetch", function (e) {
  if ("GET" === e.request.method) {
    var t,
        a = stripIgnoredUrlParameters(e.request.url, ignoreUrlParametersMatching);
    (t = urlsToCacheKeys.has(a)) || (a = addDirectoryIndex(a, "index.html"), t = urlsToCacheKeys.has(a));
    !t && "navigate" === e.request.mode && isPathWhitelisted([], e.request.url) && (a = new URL("/index.html", self.location).toString(), t = urlsToCacheKeys.has(a)), t && e.respondWith(caches.open(cacheName).then(function (e) {
      return e.match(urlsToCacheKeys.get(a)).then(function (e) {
        if (e) return e;
        throw Error("The cached response that was expected is missing.");
      });
    }).catch(function (t) {
      return console.warn('Couldn\'t serve response for "%s" from cache: %O', e.request.url, t), fetch(e.request);
    }));
  }
});
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49608" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","dist/sw.js"], null)
//# sourceMappingURL=/dist/sw.js.map