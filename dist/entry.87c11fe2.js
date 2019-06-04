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
})({"orca/core/transpose.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'A': 'A0',
  'a': 'a0',
  'B': 'B0',
  'C': 'C0',
  'c': 'c0',
  'D': 'D0',
  'd': 'd0',
  'E': 'E0',
  'F': 'F0',
  'f': 'f0',
  'G': 'G0',
  'g': 'g0',
  'H': 'A0',
  'h': 'a0',
  'I': 'B0',
  'J': 'C1',
  'j': 'c1',
  'K': 'D1',
  'k': 'd1',
  'L': 'E1',
  'M': 'F1',
  'm': 'f1',
  'N': 'G1',
  'n': 'g1',
  'O': 'A1',
  'o': 'a1',
  'P': 'B1',
  'Q': 'C2',
  'q': 'c2',
  'R': 'D2',
  'r': 'd2',
  'S': 'E2',
  'T': 'F2',
  't': 'f2',
  'U': 'G2',
  'u': 'g2',
  'V': 'A2',
  'v': 'a2',
  'W': 'B2',
  'X': 'C3',
  'x': 'c3',
  'Y': 'D3',
  'y': 'd3',
  'Z': 'E3',
  // Catch e
  'e': 'F0',
  'l': 'F1',
  's': 'F2',
  'z': 'F3',
  // Catch b
  'b': 'C1',
  'i': 'C1',
  'p': 'C2',
  'w': 'C3'
};
exports.default = _default;
},{}],"orca/core/operator.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Operator;

var _transpose = _interopRequireDefault(require("./transpose.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Operator(orca, x, y) {
  var glyph = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
  var passive = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  this.name = 'unknown';
  this.x = x;
  this.y = y;
  this.passive = passive;
  this.draw = passive;
  this.glyph = passive ? glyph.toUpperCase() : glyph;
  this.info = '--';
  this.ports = {
    bang: !passive // Actions

  };

  this.listen = function (port) {
    var toValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!port) {
      return toValue ? 0 : '.';
    }

    var g = orca.glyphAt(this.x + port.x, this.y + port.y);
    var glyph = (g === '.' || g === '*') && port.default ? port.default : g;

    if (toValue) {
      var min = port.clamp && port.clamp.min ? port.clamp.min : 0;
      var max = port.clamp && port.clamp.max ? port.clamp.max : 36;
      return clamp(orca.valueOf(glyph), min, max);
    }

    return glyph;
  };

  this.output = function (g) {
    if (!this.ports.output) {
      console.warn(this.name, 'Trying to output, but no port');
      return;
    }

    if (!g) {
      return;
    }

    orca.write(this.x + this.ports.output.x, this.y + this.ports.output.y, this.requireUC() === true ? "".concat(g).toUpperCase() : g);
  };

  this.bang = function (b) {
    if (!this.ports.output) {
      console.warn(this.name, 'Trying to bang, but no port');
      return;
    }

    orca.write(this.x + this.ports.output.x, this.y + this.ports.output.y, b === true ? '*' : '.');
  }; // Phases


  this.run = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    // Permissions
    for (var id in this.ports) {
      orca.lock(this.x + this.ports[id].x, this.y + this.ports[id].y);
    }

    this.draw = true; // Operate

    var payload = this.operation(force);

    if (this.ports.output) {
      if (this.ports.output.bang === true) {
        this.bang(payload);
      } else {
        this.output(payload);
      }
    }
  };

  this.operation = function () {}; // Helpers


  this.lock = function () {
    orca.lock(this.x, this.y);
  };

  this.replace = function (g) {
    orca.write(this.x, this.y, g);
  };

  this.erase = function () {
    this.replace('.');
  };

  this.explode = function () {
    this.replace('*'); // this.lock()
  };

  this.move = function (x, y) {
    var offset = {
      x: this.x + x,
      y: this.y + y
    };

    if (!orca.inBounds(offset.x, offset.y)) {
      this.explode();
      return;
    }

    var collider = orca.glyphAt(offset.x, offset.y);

    if (collider !== '*' && collider !== '.') {
      this.explode();
      return;
    }

    this.erase();
    this.x += x;
    this.y += y;
    this.replace(this.glyph);
    this.lock();
  };

  this.hasNeighbor = function (g) {
    if (orca.glyphAt(this.x + 1, this.y) === g) {
      return true;
    }

    if (orca.glyphAt(this.x - 1, this.y) === g) {
      return true;
    }

    if (orca.glyphAt(this.x, this.y + 1) === g) {
      return true;
    }

    if (orca.glyphAt(this.x, this.y - 1) === g) {
      return true;
    }

    return false;
  }; // Docs


  this.getPorts = function () {
    var a = [];

    if (this.draw === true) {
      a.push([this.x, this.y, 0, "".concat(this.name.charAt(0).toUpperCase() + this.name.substring(1).toLowerCase())]);
    }

    if (!this.passive) {
      return a;
    }

    for (var id in this.ports) {
      var port = this.ports[id];
      a.push([this.x + port.x, this.y + port.y, port.x < 0 || port.y < 0 ? 1 : 2, "".concat(this.glyph, "-").concat(id)]);
    }

    if (this.ports.output) {
      var _port = this.ports.output;
      a.push([this.x + _port.x, this.y + _port.y, _port.reader || _port.bang ? 8 : 3, "".concat(this.glyph, "-output")]);
    }

    return a;
  };

  this.requireUC = function () {
    var ports = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ports;

    if (this.ports.output.sensitive !== true) {
      return false;
    }

    for (var id in ports) {
      var value = this.listen(ports[id]);

      if (value.length !== 1) {
        continue;
      }

      if (value.toLowerCase() === value.toUpperCase()) {
        continue;
      }

      if ("".concat(value).toUpperCase() === "".concat(value)) {
        return true;
      }
    }

    return false;
  }; // Notes tools


  this.transpose = function (n) {
    var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

    if (!_transpose.default[n]) {
      return {
        note: n,
        octave: o
      };
    }

    var note = _transpose.default[n].charAt(0);

    var octave = clamp(parseInt(_transpose.default[n].charAt(1)) + o, 0, 8);
    var value = ['C', 'c', 'D', 'd', 'E', 'F', 'f', 'G', 'g', 'A', 'a', 'B'].indexOf(note);
    var id = clamp(octave * 12 + value, 0, 127);
    var real = id < 89 ? Object.keys(_transpose.default)[id - 45] : null;
    return {
      id: id,
      value: value,
      note: note,
      octave: octave,
      real: real
    };
  }; // Docs


  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{"./transpose.js":"orca/core/transpose.js"}],"orca/core/library/_null.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorNull;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorNull(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, '.', false);

  this.name = 'null';
  this.info = 'empty'; // Overwrite run, to disable draw.

  this.run = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/a.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorA;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorA(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'a', passive);

  this.name = 'add';
  this.info = 'Outputs sum of inputs';
  this.ports.a = {
    x: -1,
    y: 0
  };
  this.ports.b = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var a = this.listen(this.ports.a, true);
    var b = this.listen(this.ports.b, true);
    return orca.keyOf(a + b);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/b.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorB;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorB(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'b', passive);

  this.name = 'bounce';
  this.info = 'Outputs values between inputs';
  this.ports.rate = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };
  this.ports.mod = {
    x: 1,
    y: 0,
    default: '8'
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var rate = this.listen(this.ports.rate, true);
    var mod = this.listen(this.ports.mod, true) - 1;
    var key = Math.floor(orca.f / rate) % (mod * 2);
    return orca.keyOf(key <= mod ? key : mod - (key - mod));
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/c.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorC;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorC(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'c', passive);

  this.name = 'clock';
  this.info = 'Outputs modulo of frame';
  this.ports.rate = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };
  this.ports.mod = {
    x: 1,
    y: 0,
    default: '8'
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var rate = this.listen(this.ports.rate, true);
    var mod = this.listen(this.ports.mod, true);
    var val = Math.floor(orca.f / rate) % mod;
    return orca.keyOf(val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/d.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorD;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorD(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'd', passive);

  this.name = 'delay';
  this.info = 'Bangs on modulo of frame';
  this.ports.rate = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };
  this.ports.mod = {
    x: 1,
    y: 0,
    default: '8'
  };
  this.ports.output = {
    x: 0,
    y: 1,
    bang: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var rate = this.listen(this.ports.rate, true);
    var mod = this.listen(this.ports.mod, true);
    var res = orca.f % (mod * rate);
    return res === 0 || mod === 1;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/e.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorE;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorE(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'e', passive);

  this.name = 'east';
  this.info = 'Moves eastward, or bangs';
  this.draw = false;

  this.operation = function () {
    this.move(1, 0);
    this.passive = false;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/f.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorF;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorF(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'f', passive);

  this.name = 'if';
  this.info = 'Bangs if inputs are equal';
  this.ports.a = {
    x: -1,
    y: 0
  };
  this.ports.b = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1,
    bang: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var a = this.listen(this.ports.a);
    var b = this.listen(this.ports.b);
    return a === b && a !== '.';
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/g.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorG;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorG(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'g', passive);

  this.name = 'generator';
  this.info = 'Writes operands with offset';
  this.ports.x = {
    x: -3,
    y: 0
  };
  this.ports.y = {
    x: -2,
    y: 0
  };
  this.ports.len = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var len = this.listen(this.ports.len, true);
    var x = this.listen(this.ports.x, true);
    var y = this.listen(this.ports.y, true) + 1;

    for (var offset = 0; offset <= len; offset++) {
      if (offset > 0) {
        orca.lock(this.x + offset, this.y);
      }

      var port = {
        x: offset + 1,
        y: 0
      };
      var value = this.listen(port);
      orca.write(this.x + x + offset, this.y + y, value);
    }

    this.ports.output = {
      x: x,
      y: y
    };
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/h.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorH;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorH(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'h', passive);

  this.name = 'halt';
  this.info = 'Halts southward operand';
  this.ports.output = {
    x: 0,
    y: 1,
    reader: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    orca.lock(this.x + this.ports.output.x, this.y + this.ports.output.y);
    return this.listen(this.ports.output, true);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/i.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorI;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorI(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'i', passive);

  this.name = 'increment';
  this.info = 'Increments southward operand';
  this.ports.step = {
    x: -1,
    y: 0,
    default: '1'
  };
  this.ports.mod = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true,
    reader: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var step = this.listen(this.ports.step, true);
    var mod = this.listen(this.ports.mod, true);
    var val = this.listen(this.ports.output, true);
    return orca.keyOf((val + step) % (mod > 0 ? mod : 36));
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/j.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorJ;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorJ(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'j', passive);

  this.name = 'jumper';
  this.info = 'Outputs northward operand';
  this.ports.val = {
    x: 0,
    y: -1
  };
  this.ports.output = {
    x: 0,
    y: 1
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    orca.lock(this.x, this.y + 1);
    return this.listen(this.ports.val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/k.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorK;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorK(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'k', passive);

  this.name = 'konkat';
  this.info = 'Reads multiple variables';
  this.ports.len = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.len = this.listen(this.ports.len, true);

    for (var _x = 1; _x <= this.len; _x++) {
      orca.lock(this.x + _x, this.y);
      var key = orca.glyphAt(this.x + _x, this.y);

      if (key === '.') {
        continue;
      }

      orca.lock(this.x + _x, this.y + 1);
      orca.write(this.x + _x, this.y + 1, orca.valueIn(key));
    }
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/l.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorL;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorL(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'l', passive);

  this.name = 'loop';
  this.info = 'Moves eastward operands';
  this.ports.step = {
    x: -2,
    y: 0,
    default: '1'
  };
  this.ports.len = {
    x: -1,
    y: 0
  };
  this.ports.val = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var len = this.listen(this.ports.len, true);
    var step = this.listen(this.ports.step, true);
    var index = orca.indexAt(this.x + 1, this.y);
    var seg = orca.s.substr(index, len);
    var res = seg.substr(len - step, step) + seg.substr(0, len - step);

    for (var offset = 0; offset <= len; offset++) {
      if (offset > 0) {
        orca.lock(this.x + offset, this.y);
      }

      orca.write(this.x + offset + 1, this.y, res.charAt(offset));
    }

    return this.listen(this.ports.val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/m.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorM;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorM(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'm', passive);

  this.name = 'multiply';
  this.info = 'Outputs product of inputs';
  this.ports.a = {
    x: -1,
    y: 0
  };
  this.ports.b = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var a = this.listen(this.ports.a, true);
    var b = this.listen(this.ports.b, true);
    return orca.keyOf(a * b);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/n.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorN;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorN(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'n', passive);

  this.name = 'north';
  this.info = 'Moves Northward, or bangs';
  this.draw = false;

  this.operation = function () {
    this.move(0, -1);
    this.passive = false;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/o.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorO;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorO(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'o', passive);

  this.name = 'read';
  this.info = 'Reads operand with offset';
  this.ports.x = {
    x: -2,
    y: 0
  };
  this.ports.y = {
    x: -1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var x = this.listen(this.ports.x, true);
    var y = this.listen(this.ports.y, true);
    this.ports.read = {
      x: x + 1,
      y: y
    };
    return this.listen(this.ports.read);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/p.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorP;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorP(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'p', passive);

  this.name = 'push';
  this.info = 'Writes eastward operand';
  this.ports.len = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };
  this.ports.key = {
    x: -2,
    y: 0
  };
  this.ports.val = {
    x: 1,
    y: 0
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var len = this.listen(this.ports.len, true);
    var key = this.listen(this.ports.key, true);

    for (var _x = 0; _x < len; _x++) {
      orca.lock(this.x + _x, this.y + 1);
    }

    this.ports.output = {
      x: key % len,
      y: 1
    };
    return this.listen(this.ports.val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/q.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorQ;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorQ(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'q', passive);

  this.name = 'query';
  this.info = 'Reads operands with offset';
  this.ports.x = {
    x: -3,
    y: 0
  };
  this.ports.y = {
    x: -2,
    y: 0
  };
  this.ports.len = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var len = this.listen(this.ports.len, true);
    var x = this.listen(this.ports.x, true);
    var y = this.listen(this.ports.y, true);

    for (var i = 1; i <= len; i++) {
      orca.lock(this.x + x + i, this.y + y);
      this.ports["val".concat(i)] = {
        x: x + i,
        y: y
      };
      this.ports.output = {
        x: i - len,
        y: 1
      };
      var res = this.listen(this.ports["val".concat(i)]);
      this.output("".concat(res));
    }

    this.ports.output = {
      x: 0,
      y: 1
    };
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/r.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorR;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorR(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'r', passive);

  this.name = 'random';
  this.info = 'Outputs random value';
  this.ports.min = {
    x: -1,
    y: 0
  };
  this.ports.max = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var min = this.listen(this.ports.min, true);
    var max = this.listen(this.ports.max, true);
    var val = parseInt(Math.random() * ((max > 0 ? max : 36) - min) + min);
    return orca.keyOf(val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/s.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorS;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorS(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 's', passive);

  this.name = 'south';
  this.info = 'Moves southward, or bangs';
  this.draw = false;

  this.operation = function () {
    this.move(0, 1);
    this.passive = false;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/t.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorT;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorT(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 't', passive);

  this.name = 'track';
  this.info = 'Reads eastward operand';
  this.ports.key = {
    x: -2,
    y: 0
  };
  this.ports.len = {
    x: -1,
    y: 0,
    clamp: {
      min: 1
    }
  };
  this.ports.output = {
    x: 0,
    y: 1
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var len = this.listen(this.ports.len, true);
    var key = this.listen(this.ports.key, true);

    for (var _x = 1; _x <= len; _x++) {
      orca.lock(this.x + _x, this.y);
    }

    this.ports.val = {
      x: key % len + 1,
      y: 0
    };
    return this.listen(this.ports.val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/u.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorU;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorU(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'u', passive);

  this.name = 'uclid';
  this.info = 'Bangs on Euclidean rhythm';
  this.ports.step = {
    x: -1,
    y: 0,
    clamp: {
      min: 0
    },
    default: '1'
  };
  this.ports.max = {
    x: 1,
    y: 0,
    clamp: {
      min: 1
    },
    default: '8'
  };
  this.ports.output = {
    x: 0,
    y: 1,
    bang: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var step = this.listen(this.ports.step, true);
    var max = this.listen(this.ports.max, true);
    var bucket = step * (orca.f + max - 1) % max + step;
    return bucket >= max;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/v.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorV;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorV(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'v', passive);

  this.name = 'variable';
  this.info = 'Reads and writes variable';
  this.ports.write = {
    x: -1,
    y: 0
  };
  this.ports.read = {
    x: 1,
    y: 0
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var write = this.listen(this.ports.write);
    var read = this.listen(this.ports.read);

    if (write === '.' && read !== '.') {
      this.ports.output = {
        x: 0,
        y: 1
      };
    }

    if (write !== '.') {
      orca.variables[write] = read;
      return;
    }

    return orca.valueIn(read);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/w.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorW;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorW(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'w', passive);

  this.name = 'west';
  this.info = 'Moves westward, or bangs';
  this.draw = false;

  this.operation = function () {
    this.move(-1, 0);
    this.passive = false;
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/x.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorX;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorX(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'x', passive);

  this.name = 'write';
  this.info = 'Writes operand with offset';
  this.ports.x = {
    x: -2,
    y: 0
  };
  this.ports.y = {
    x: -1,
    y: 0
  };
  this.ports.val = {
    x: 1,
    y: 0
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var x = this.listen(this.ports.x, true);
    var y = this.listen(this.ports.y, true) + 1;
    this.ports.output = {
      x: x,
      y: y
    };
    return this.listen(this.ports.val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/y.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorY;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorY(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'y', passive);

  this.name = 'jymper';
  this.info = 'Outputs westward operand';
  this.ports.val = {
    x: -1,
    y: 0
  };
  this.ports.output = {
    x: 1,
    y: 0
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    orca.lock(this.x + 1, this.y);
    return this.listen(this.ports.val);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/z.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorZ;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorZ(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, 'z', passive);

  this.name = 'lerp';
  this.info = 'Transitions operand to target';
  this.ports.rate = {
    x: -1,
    y: 0,
    default: '1'
  };
  this.ports.target = {
    x: 1,
    y: 0
  };
  this.ports.output = {
    x: 0,
    y: 1,
    sensitive: true,
    reader: true
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var rate = this.listen(this.ports.rate, true);
    var target = this.listen(this.ports.target, true);
    var val = this.listen(this.ports.output, true);
    var mod = val <= target - rate ? rate : val >= target + rate ? -rate : target - val;
    return orca.keyOf(val + mod);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_bang.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorBang;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorBang(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, '*', true);

  this.name = 'bang';
  this.info = 'Bangs neighboring operands';
  this.draw = false;

  this.run = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.draw = false;
    this.erase();
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_comment.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorComment;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorComment(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, '#', true);

  this.name = 'comment';
  this.info = 'Halts line';
  this.draw = false;

  this.operation = function () {
    for (var _x = this.x + 1; _x <= orca.w; _x++) {
      orca.lock(_x, this.y);

      if (orca.glyphAt(_x, this.y) === this.glyph) {
        break;
      }
    }

    orca.lock(this.x, this.y);
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_midi.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorMidi;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorMidi(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, ':', true);

  this.name = 'midi';
  this.info = 'Sends MIDI note';
  this.ports.channel = {
    x: 1,
    y: 0,
    clamp: {
      min: 0,
      max: 16
    }
  };
  this.ports.octave = {
    x: 2,
    y: 0,
    clamp: {
      min: 0,
      max: 8
    }
  };
  this.ports.note = {
    x: 3,
    y: 0
  };
  this.ports.velocity = {
    x: 4,
    y: 0,
    default: 'f',
    clamp: {
      min: 0,
      max: 16
    }
  };
  this.ports.length = {
    x: 5,
    y: 0,
    default: '1',
    clamp: {
      min: 0,
      max: 16
    }
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.hasNeighbor('*') && force === false) {
      return;
    }

    if (this.listen(this.ports.channel) === '.') {
      return;
    }

    if (this.listen(this.ports.octave) === '.') {
      return;
    }

    if (this.listen(this.ports.note) === '.') {
      return;
    }

    var channel = this.listen(this.ports.channel, true);
    var rawOctave = this.listen(this.ports.octave, true);
    var rawNote = this.listen(this.ports.note);
    var rawVelocity = this.listen(this.ports.velocity, true);
    var length = this.listen(this.ports.length, true);

    if (!isNaN(rawNote)) {
      return;
    }

    var transposed = this.transpose(rawNote, rawOctave); // 1 - 8

    var octave = transposed.octave; // 0 - 11

    var note = transposed.value; // 0 - G(127)

    var velocity = parseInt(rawVelocity / 16 * 127);
    this.draw = false;
    orca.terminal.io.midi.send(channel, octave, note, velocity, length);

    if (force === true) {
      terminal.io.midi.run();
    }
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_mono.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorMono;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorMono(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, '%', true);

  this.name = 'mono';
  this.info = 'Sends MIDI monophonic note';
  this.ports.channel = {
    x: 1,
    y: 0,
    clamp: {
      min: 0,
      max: 16
    }
  };
  this.ports.octave = {
    x: 2,
    y: 0,
    clamp: {
      min: 0,
      max: 8
    }
  };
  this.ports.note = {
    x: 3,
    y: 0
  };
  this.ports.velocity = {
    x: 4,
    y: 0,
    default: 'f',
    clamp: {
      min: 0,
      max: 16
    }
  };
  this.ports.length = {
    x: 5,
    y: 0,
    default: '1',
    clamp: {
      min: 0,
      max: 16
    }
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.hasNeighbor('*') && force === false) {
      return;
    }

    if (this.listen(this.ports.channel) === '.') {
      return;
    }

    if (this.listen(this.ports.octave) === '.') {
      return;
    }

    if (this.listen(this.ports.note) === '.') {
      return;
    }

    var channel = this.listen(this.ports.channel, true);
    var rawOctave = this.listen(this.ports.octave, true);
    var rawNote = this.listen(this.ports.note);
    var rawVelocity = this.listen(this.ports.velocity, true);
    var length = this.listen(this.ports.length, true);

    if (!isNaN(rawNote)) {
      return;
    }

    var transposed = this.transpose(rawNote, rawOctave); // 1 - 8

    var octave = transposed.octave; // 0 - 11

    var note = transposed.value; // 0 - G(127)

    var velocity = parseInt(rawVelocity / 16 * 127);
    this.draw = false;
    terminal.io.mono.send(channel, octave, note, velocity, length);

    if (force === true) {
      terminal.io.mono.run();
    }
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_cc.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorCC;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorCC(orca, x, y) {
  _operator.default.call(this, orca, x, y, '!', true);

  this.name = 'cc';
  this.info = 'Sends MIDI control change';
  this.ports.channel = {
    x: 1,
    y: 0,
    clamp: {
      min: 0,
      max: 15
    }
  };
  this.ports.knob = {
    x: 2,
    y: 0,
    clamp: {
      min: 0
    }
  };
  this.ports.value = {
    x: 3,
    y: 0,
    clamp: {
      min: 0
    }
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.hasNeighbor('*') && force === false) {
      return;
    }

    if (this.listen(this.ports.channel) === '.') {
      return;
    }

    if (this.listen(this.ports.knob) === '.') {
      return;
    }

    var channel = this.listen(this.ports.channel, true);
    var knob = this.listen(this.ports.knob, true);
    var rawValue = this.listen(this.ports.value, true);
    var value = Math.ceil(127 * rawValue / 35);
    this.draw = false;
    terminal.io.cc.send(channel, knob, value);

    if (force === true) {
      terminal.io.cc.run();
    }
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_udp.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorUdp;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorUdp(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, ';', true);

  this.name = 'udp';
  this.info = 'Sends UDP message';

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.hasNeighbor('*') && force === false) {
      return;
    }

    for (var _x = 1; _x <= 36; _x++) {
      var g = orca.glyphAt(this.x + _x, this.y);

      if (g === '.') {
        break;
      }

      orca.lock(this.x + _x, this.y);
    }

    var msg = '';

    for (var _x2 = 1; _x2 <= 36; _x2++) {
      var _g = orca.glyphAt(this.x + _x2, this.y);

      if (_g === '.') {
        break;
      }

      msg += _g;
    }

    if (msg === '') {
      return;
    }

    this.draw = false;
    terminal.io.udp.send(msg);

    if (force === true) {
      terminal.io.udp.run();
    }
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_osc.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorOsc;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function OperatorOsc(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, '=', true);

  this.name = 'osc';
  this.info = 'Sends OSC message';
  this.ports.path = {
    x: 1,
    y: 0
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!this.hasNeighbor('*') && force === false) {
      return;
    }

    this.path = this.listen(this.ports.path);

    if (!this.path || this.path === '.') {
      return;
    }

    this.msg = '';

    for (var _x = 2; _x <= 36; _x++) {
      var g = orca.glyphAt(this.x + _x, this.y);

      if (g === '.') {
        break;
      }

      orca.lock(this.x + _x, this.y);
      this.msg += g;
    }

    this.draw = false;
    terminal.io.osc.send('/' + this.path, this.msg);

    if (force === true) {
      terminal.io.osc.run();
    }
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library/_keys.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = OperatorKeys;

var _operator = _interopRequireDefault(require("../operator.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OCTAVE = ['C', 'c', 'D', 'd', 'E', 'F', 'f', 'G', 'g', 'A', 'a', 'B'];

function OperatorKeys(orca, x, y, passive) {
  _operator.default.call(this, orca, x, y, '&', true);

  this.name = 'mono';
  this.info = 'Receive MIDI note';
  this.ports.output = {
    x: 0,
    y: 1
  };

  this.operation = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (!terminal.io.midi.key) {
      return '.';
    }

    var octave = Math.floor(terminal.io.midi.key / 12);
    var value = terminal.io.midi.key % 12;
    var note = OCTAVE[value];
    var transposed = this.transpose(note, octave);
    return transposed && transposed.real ? transposed.real : '.';
  };
}
},{"../operator.js":"orca/core/operator.js"}],"orca/core/library.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _null2 = _interopRequireDefault(require("./library/_null.js"));

var _a = _interopRequireDefault(require("./library/a.js"));

var _b = _interopRequireDefault(require("./library/b.js"));

var _c = _interopRequireDefault(require("./library/c.js"));

var _d = _interopRequireDefault(require("./library/d.js"));

var _e = _interopRequireDefault(require("./library/e.js"));

var _f = _interopRequireDefault(require("./library/f.js"));

var _g = _interopRequireDefault(require("./library/g.js"));

var _h = _interopRequireDefault(require("./library/h.js"));

var _i = _interopRequireDefault(require("./library/i.js"));

var _j = _interopRequireDefault(require("./library/j.js"));

var _k = _interopRequireDefault(require("./library/k.js"));

var _l = _interopRequireDefault(require("./library/l.js"));

var _m = _interopRequireDefault(require("./library/m.js"));

var _n = _interopRequireDefault(require("./library/n.js"));

var _o = _interopRequireDefault(require("./library/o.js"));

var _p = _interopRequireDefault(require("./library/p.js"));

var _q = _interopRequireDefault(require("./library/q.js"));

var _r = _interopRequireDefault(require("./library/r.js"));

var _s = _interopRequireDefault(require("./library/s.js"));

var _t = _interopRequireDefault(require("./library/t.js"));

var _u = _interopRequireDefault(require("./library/u.js"));

var _v = _interopRequireDefault(require("./library/v.js"));

var _w = _interopRequireDefault(require("./library/w.js"));

var _x = _interopRequireDefault(require("./library/x.js"));

var _y = _interopRequireDefault(require("./library/y.js"));

var _z = _interopRequireDefault(require("./library/z.js"));

var _bang2 = _interopRequireDefault(require("./library/_bang.js"));

var _comment2 = _interopRequireDefault(require("./library/_comment.js"));

var _midi2 = _interopRequireDefault(require("./library/_midi.js"));

var _mono2 = _interopRequireDefault(require("./library/_mono.js"));

var _cc2 = _interopRequireDefault(require("./library/_cc.js"));

var _udp2 = _interopRequireDefault(require("./library/_udp.js"));

var _osc2 = _interopRequireDefault(require("./library/_osc.js"));

var _keys2 = _interopRequireDefault(require("./library/_keys.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  '0': _null2.default,
  '1': _null2.default,
  '2': _null2.default,
  '3': _null2.default,
  '4': _null2.default,
  '5': _null2.default,
  '6': _null2.default,
  '7': _null2.default,
  '8': _null2.default,
  '9': _null2.default,
  a: _a.default,
  b: _b.default,
  c: _c.default,
  d: _d.default,
  e: _e.default,
  f: _f.default,
  g: _g.default,
  h: _h.default,
  i: _i.default,
  j: _j.default,
  k: _k.default,
  l: _l.default,
  m: _m.default,
  n: _n.default,
  o: _o.default,
  p: _p.default,
  q: _q.default,
  r: _r.default,
  s: _s.default,
  t: _t.default,
  u: _u.default,
  v: _v.default,
  w: _w.default,
  x: _x.default,
  y: _y.default,
  z: _z.default,
  '*': _bang2.default,
  '#': _comment2.default,
  ':': _midi2.default,
  '%': _mono2.default,
  '!': _cc2.default,
  ';': _udp2.default,
  '=': _osc2.default,
  '&': _keys2.default
};
exports.default = _default;
},{"./library/_null.js":"orca/core/library/_null.js","./library/a.js":"orca/core/library/a.js","./library/b.js":"orca/core/library/b.js","./library/c.js":"orca/core/library/c.js","./library/d.js":"orca/core/library/d.js","./library/e.js":"orca/core/library/e.js","./library/f.js":"orca/core/library/f.js","./library/g.js":"orca/core/library/g.js","./library/h.js":"orca/core/library/h.js","./library/i.js":"orca/core/library/i.js","./library/j.js":"orca/core/library/j.js","./library/k.js":"orca/core/library/k.js","./library/l.js":"orca/core/library/l.js","./library/m.js":"orca/core/library/m.js","./library/n.js":"orca/core/library/n.js","./library/o.js":"orca/core/library/o.js","./library/p.js":"orca/core/library/p.js","./library/q.js":"orca/core/library/q.js","./library/r.js":"orca/core/library/r.js","./library/s.js":"orca/core/library/s.js","./library/t.js":"orca/core/library/t.js","./library/u.js":"orca/core/library/u.js","./library/v.js":"orca/core/library/v.js","./library/w.js":"orca/core/library/w.js","./library/x.js":"orca/core/library/x.js","./library/y.js":"orca/core/library/y.js","./library/z.js":"orca/core/library/z.js","./library/_bang.js":"orca/core/library/_bang.js","./library/_comment.js":"orca/core/library/_comment.js","./library/_midi.js":"orca/core/library/_midi.js","./library/_mono.js":"orca/core/library/_mono.js","./library/_cc.js":"orca/core/library/_cc.js","./library/_udp.js":"orca/core/library/_udp.js","./library/_osc.js":"orca/core/library/_osc.js","./library/_keys.js":"orca/core/library/_keys.js"}],"orca/core/orca.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Orca;

var _library = _interopRequireDefault(require("./library.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Orca(terminal) {
  this.w = 1; // Default Width

  this.h = 1; // Default Height

  this.f = 0; // Frame

  this.s = ''; // String

  this.terminal = terminal;
  this.keys = Object.keys(_library.default).slice(0, 36);
  this.locks = [];
  this.runtime = [];
  this.variables = {};

  this.run = function () {
    this.runtime = this.parse();
    this.operate(this.runtime);
    this.f += 1;
  };

  this.reset = function () {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.w;
    var h = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.h;
    this.f = 0;
    this.w = w;
    this.h = h;
    this.replace(new Array(this.h * this.w + 1).join('.'));
  };

  this.load = function (w, h, s) {
    var f = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    this.w = w;
    this.h = h;
    this.f = f;
    this.replace(this.clean(s));
    return this;
  };

  this.write = function (x, y, g) {
    if (!g) {
      return false;
    }

    if (g.length !== 1) {
      return false;
    }

    if (!this.inBounds(x, y)) {
      return false;
    }

    if (this.glyphAt(x, y) === g) {
      return false;
    }

    var index = this.indexAt(x, y);
    var glyph = !this.isAllowed(g) ? '.' : g;
    var string = this.s.substr(0, index) + glyph + this.s.substr(index + 1);
    this.replace(string);
    return true;
  };

  this.clean = function (str) {
    return "".concat(str).replace(/\n/g, '').trim().substr(0, this.w * this.h);
  };

  this.replace = function (s) {
    this.s = s;
  }; // Operators


  this.parse = function () {
    var a = [];

    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var g = this.glyphAt(x, y);
        var operator = this.cast(g, x, y);

        if (operator) {
          a.push(operator);
        }
      }
    }

    return a;
  };

  this.cast = function (g, x, y) {
    if (g === '.') {
      return;
    }

    if (!_library.default[g.toLowerCase()]) {
      return;
    }

    var passive = g === g.toUpperCase();
    return new _library.default[g.toLowerCase()](this, x, y, passive);
  };

  this.operate = function (operators) {
    this.release();

    for (var id in operators) {
      var operator = operators[id];

      if (this.lockAt(operator.x, operator.y)) {
        continue;
      }

      if (operator.passive || operator.hasNeighbor('*')) {
        operator.run();
      }
    }
  };

  this.bounds = function () {
    var w = 0;
    var h = 0;

    for (var y = 0; y < this.h; y++) {
      for (var x = 0; x < this.w; x++) {
        var g = this.glyphAt(x, y);

        if (g !== '.') {
          if (x > w) {
            w = x;
          }

          if (y > h) {
            h = y;
          }
        }
      }
    }

    return {
      w: w,
      h: h
    };
  }; // Locks


  this.release = function () {
    this.locks = new Array(this.w * this.h);
    this.variables = {};
  };

  this.unlock = function (x, y) {
    this.locks[this.indexAt(x, y)] = null;
  };

  this.lock = function (x, y) {
    if (this.lockAt(x, y)) {
      return;
    }

    this.locks[this.indexAt(x, y)] = true;
  }; // Helpers


  this.inBounds = function (x, y) {
    return Number.isInteger(x) && Number.isInteger(y) && x >= 0 && x < this.w && y >= 0 && y < this.h;
  };

  this.isAllowed = function (g) {
    return g === '.' || !!_library.default["".concat(g).toLowerCase()];
  };

  this.keyOf = function (val) {
    var uc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return uc === true ? this.keys[val % 36].toUpperCase() : this.keys[val % 36];
  };

  this.valueOf = function (g) {
    return g === '.' ? 0 : this.keys.indexOf("".concat(g).toLowerCase());
  };

  this.indexAt = function (x, y) {
    return this.inBounds(x, y) === true ? x + this.w * y : -1;
  };

  this.operatorAt = function (x, y) {
    return this.runtime.filter(function (item) {
      return item.x === x && item.y === y;
    })[0];
  };

  this.posAt = function (index) {
    return {
      x: index % this.w,
      y: parseInt(index / this.w)
    };
  };

  this.glyphAt = function (x, y) {
    return this.s.charAt(this.indexAt(x, y));
  };

  this.valueAt = function (x, y) {
    return this.valueOf(this.glyphAt(x, y));
  };

  this.lockAt = function (x, y) {
    return this.locks[this.indexAt(x, y)] === true;
  };

  this.valueIn = function (key) {
    return this.variables[key];
  }; // Tools


  this.format = function () {
    var a = [];

    for (var y = 0; y < this.h; y++) {
      a.push(this.s.substr(y * this.w, this.w));
    }

    return a.reduce(function (acc, val) {
      return "".concat(acc).concat(val, "\n");
    }, '');
  };

  this.length = function () {
    return this.strip().length;
  };

  this.strip = function () {
    return this.s.replace(/[^a-zA-Z0-9+]+/gi, '').trim();
  };

  this.toString = function () {
    return this.format().trim();
  };

  this.reset();
}
},{"./library.js":"orca/core/library.js"}],"orca/core/io/midi.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Midi;

function Midi(terminal) {
  this.mode = 0;
  this.outputIndex = -1;
  this.inputIndex = -1;
  this.outputs = [];
  this.inputs = [];
  this.stack = [];
  this.key = null;

  this.start = function () {
    console.info('Midi Starting..');
    this.setup();
  };

  this.clear = function () {};

  this.update = function () {
    var _this = this;

    terminal.controller.clearCat('default', 'Midi');
    terminal.controller.add('default', 'Midi', "Refresh Device List", function () {
      terminal.io.midi.setup();
      terminal.io.midi.update();
    });
    terminal.controller.addSpacer('default', 'Midi', 'spacer1'); // Outputs

    if (this.outputs.length < 1) {
      terminal.controller.add('default', 'Midi', "No Midi Outputs");
    } else {
      var _loop = function _loop(id) {
        terminal.controller.add('default', 'Midi', "".concat(_this.outputs[id].name, " Output ").concat(terminal.io.midi.outputIndex === parseInt(id) ? ' — Active' : ''), function () {
          terminal.io.midi.selectOutput(id);
        }, '');
      };

      for (var id in this.outputs) {
        _loop(id);
      }

      terminal.controller.add('default', 'Midi', "No Output ".concat(terminal.io.midi.outputIndex === -1 ? ' — Active' : ''), function () {
        terminal.io.midi.selectOutput(-1);
      }, '');
      terminal.controller.addSpacer('default', 'Midi', 'spacer2');
    } // Inputs


    if (this.inputs.length < 1) {
      terminal.controller.add('default', 'Midi', "No Midi Inputs");
    } else {
      var _loop2 = function _loop2(id) {
        terminal.controller.add('default', 'Midi', "".concat(_this.inputs[id].name, " Input ").concat(terminal.io.midi.inputIndex === parseInt(id) ? ' — Active' : ''), function () {
          terminal.io.midi.selectInput(id);
        }, '');
      };

      for (var id in this.inputs) {
        _loop2(id);
      }

      terminal.controller.add('default', 'Midi', "No Input ".concat(terminal.io.midi.inputIndex === -1 ? ' — Active' : ''), function () {
        terminal.io.midi.selectInput(-1);
      }, '');
    }

    terminal.controller.commit();
  };

  this.run = function () {
    var _this2 = this;

    this.stack = this.stack.filter(function (item) {
      var alive = item[4] > 0;
      var played = item[5];

      if (alive !== true) {
        _this2.trigger(item, false);
      } else if (played !== true) {
        _this2.trigger(item, true);
      }

      item[4]--;
      return alive;
    });
  };

  this.trigger = function (item, down) {
    if (!this.outputDevice()) {
      console.warn('Midi', 'No midi output!');
      return;
    }

    var channel = down === true ? 0x90 + item[0] : 0x80 + item[0];
    var note = clamp(24 + item[1] * 12 + item[2], 0, 127);
    var velocity = clamp(item[3], 0, 127);
    this.outputDevice().send([channel, note, velocity]);
    item[5] = true;
  };

  this.send = function (channel, octave, note, velocity, length) {
    var played = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    for (var id in this.stack) {
      var item = this.stack[id];

      if (item[0] === channel && item[1] === octave && item[2] === note) {
        item[3] = velocity;
        item[4] = length;
        item[5] = played;
        return;
      }
    }

    this.stack.push([channel, octave, note, velocity, length, played]);
  };

  this.silence = function () {
    var _this3 = this;

    this.stack = this.stack.filter(function (item) {
      _this3.trigger(item, false);

      return false;
    });
  }; // Keys


  this.press = function (key) {
    this.key = parseInt(key);
  };

  this.release = function () {
    this.key = null;
  }; // Clock


  this.ticks = []; // TODO

  this.sendClock = function () {
    var _this4 = this;

    if (!this.outputDevice()) {
      return;
    }

    if (this.sendClock !== true) {
      return;
    }

    var bpm = terminal.clock.speed.value;
    var frameTime = 60000 / bpm / 4;
    var frameFrag = frameTime / 6;

    for (var id = 0; id < 6; id++) {
      if (this.ticks[id]) {
        clearTimeout(this.ticks[id]);
      }

      this.ticks[id] = setTimeout(function () {
        _this4.outputDevice().send([0xF8], 0);
      }, parseInt(id) * frameFrag);
    }
  };

  this.receive = function (msg) {
    switch (msg.data[0]) {
      // Keys
      case 0x90:
        this.press(msg.data[1]);
        break;

      case 0x80:
        this.release();
        break;
      // Clock

      case 0xF8:
        terminal.clock.tap();
        break;

      case 0xFA:
        console.log('Midi', 'Clock start.');
        terminal.clock.play();
        break;

      case 0xFC:
        console.log('Midi', 'Clock stop.');
        terminal.clock.stop();
        break;
    }
  }; // Tools


  this.selectOutput = function (id) {
    if (id === -1) {
      this.outputIndex = -1;
      console.log('Midi', "Select Output Device: None");
      this.update();
      return;
    }

    if (!this.outputs[id]) {
      return;
    }

    this.outputIndex = parseInt(id);
    console.log('Midi', "Select Output Device: ".concat(this.outputDevice().name));
    this.update();
  };

  this.selectInput = function (id) {
    var _this5 = this;

    if (this.inputDevice()) {
      this.inputDevice().onmidimessage = null;
    }

    if (id === -1) {
      this.inputIndex = -1;
      console.log('Midi', "Select Input Device: None");
      this.update();
      return;
    }

    if (!this.inputs[id]) {
      return;
    }

    this.inputIndex = parseInt(id);

    this.inputDevice().onmidimessage = function (msg) {
      _this5.receive(msg);
    };

    console.log('Midi', "Select Input Device: ".concat(this.inputDevice().name));
    this.update();
  };

  this.outputDevice = function () {
    return this.outputs[this.outputIndex];
  };

  this.inputDevice = function () {
    return this.inputs[this.inputIndex];
  }; // Setup


  this.setup = function () {
    if (!navigator.requestMIDIAccess) {
      return;
    }

    navigator.requestMIDIAccess({
      sysex: false
    }).then(this.access, function (err) {
      console.warn('No Midi', err);
    });
  };

  this.access = function (midiAccess) {
    var outputs = midiAccess.outputs.values();
    terminal.io.midi.outputs = [];

    for (var i = outputs.next(); i && !i.done; i = outputs.next()) {
      terminal.io.midi.outputs.push(i.value);
    }

    terminal.io.midi.selectOutput(0);
    var inputs = midiAccess.inputs.values();
    terminal.io.midi.inputs = [];

    for (var _i = inputs.next(); _i && !_i.done; _i = inputs.next()) {
      terminal.io.midi.inputs.push(_i.value);
    }

    terminal.io.midi.selectInput(-1);
  }; // UI


  this.toString = function () {
    return this.outputDevice() ? "".concat(this.outputDevice().name) : 'No Midi';
  };

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{}],"orca/core/io/cc.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MidiCC;

function MidiCC(terminal) {
  this.stack = [];

  this.start = function () {
    console.info('MidiCC', 'Starting..');
  };

  this.clear = function () {
    this.stack = [];
  };

  this.run = function () {
    for (var id in this.stack) {
      this.play(this.stack[id]);
    }
  };

  this.send = function (channel, knob, value) {
    this.stack.push([channel, knob, value]);
  };

  this.play = function (data) {
    var device = terminal.io.midi.outputDevice();

    if (!device) {
      console.warn('MidiCC', "No Midi device.");
      return;
    }

    device.send([0xb0 + data[0], 64 + data[1], data[2]]);
  };
}
},{}],"orca/core/io/mono.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Mono;

function Mono(terminal) {
  this.queue = null;
  this.stack = [];

  this.start = function () {
    console.info('MidiMono Starting..');
  };

  this.run = function () {
    if (this.stack[0]) {
      if (this.stack[0].length <= 1) {
        this.release();
      } else {
        this.stack[0].length--;
      }
    }

    if (this.queue) {
      this.press();
    }
  };

  this.press = function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.queue;

    if (!item) {
      return;
    }

    if (this.stack[0]) {
      this.release();
    }

    this.trigger(item, true);
    this.stack[0] = item;
    this.queue = null;
  };

  this.release = function () {
    var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.stack[0];

    if (!item) {
      return;
    }

    this.trigger(this.stack[0], false);
    this.stack = [];
  };

  this.clear = function () {};

  this.trigger = function (item, down) {
    if (!terminal.io.midi.outputDevice()) {
      console.warn('MidiMono', 'No midi output!');
      return;
    }

    if (!item) {
      return;
    }

    var channel = down === true ? 0x90 + item.channel : 0x80 + item.channel;
    var note = clamp(24 + item.octave * 12 + item.note, 0, 127);
    var velocity = clamp(item.velocity, 0, 127);
    terminal.io.midi.outputDevice().send([channel, note, velocity]);
  };

  this.send = function (channel, octave, note, velocity, length) {
    this.queue = {
      channel: channel,
      octave: octave,
      note: note,
      velocity: velocity,
      length: length
    };
  };

  this.silence = function () {
    this.release();
  }; // UI


  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{}],"orca/core/io/udp.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Udp;

function Udp(terminal) {
  this.stack = [];
  this.port = null;
  this.options = {
    default: 49161,
    orca: 49160
  };

  this.start = function () {
    console.info('UDP Starting..');
  };

  this.clear = function () {
    this.stack = [];
  };

  this.run = function () {
    for (var id in this.stack) {
      this.play(this.stack[id]);
    }
  };

  this.send = function (msg) {
    this.stack.push(msg);
  };

  this.play = function (data) {};

  this.select = function () {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.default;
  };

  this.update = function () {};
}
},{}],"orca/core/io/osc.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Osc;

function Osc(terminal) {
  this.stack = [];
  this.port = null;
  this.options = {
    default: 49162,
    tidalCycles: 6010,
    sonicPi: 4559,
    superCollider: 57120
  };

  this.start = function () {
    console.info('OSC Starting..');
  };

  this.clear = function () {
    this.stack = [];
  };

  this.run = function () {
    for (var id in this.stack) {
      this.play(this.stack[id]);
    }
  };

  this.send = function (path, msg) {
    this.stack.push({
      path: path,
      msg: msg
    });
  };

  this.play = function (_ref) {
    var path = _ref.path,
        msg = _ref.msg;
  };

  this.select = function () {
    var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.default;
  };

  this.update = function () {};

  this.setup = function () {
    var ip = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '127.0.0.1';
  };
}
},{}],"orca/core/io.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = IO;

var _midi = _interopRequireDefault(require("./io/midi.js"));

var _cc = _interopRequireDefault(require("./io/cc.js"));

var _mono = _interopRequireDefault(require("./io/mono.js"));

var _udp = _interopRequireDefault(require("./io/udp.js"));

var _osc = _interopRequireDefault(require("./io/osc.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function IO(terminal) {
  this.midi = new _midi.default(terminal);
  this.cc = new _cc.default(terminal);
  this.mono = new _mono.default(terminal);
  this.udp = new _udp.default(terminal);
  this.osc = new _osc.default(terminal);

  this.start = function () {
    this.midi.start();
    this.cc.start();
    this.mono.start();
    this.udp.start();
    this.osc.start();
    this.clear();
  };

  this.clear = function () {
    this.midi.clear();
    this.cc.clear();
    this.mono.clear();
    this.udp.clear();
    this.osc.clear();
  };

  this.run = function () {
    this.midi.run();
    this.cc.run();
    this.mono.run();
    this.udp.run();
    this.osc.run();
  };

  this.silence = function () {
    this.midi.silence();
    this.mono.silence();
  };

  this.length = function () {
    return this.midi.stack.length + this.cc.stack.length + this.udp.stack.length + this.osc.stack.length + this.mono.stack.length;
  };

  this.inspect = function () {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : terminal.grid.w;
    var text = '';

    for (var i = 0; i < this.length(); i++) {
      text += '|';
    }

    return fill(text, limit, '.');
  };

  function fill(str, len, chr) {
    while (str.length < len) {
      str += chr;
    }

    ;
    return str;
  }
}
},{"./io/midi.js":"orca/core/io/midi.js","./io/cc.js":"orca/core/io/cc.js","./io/mono.js":"orca/core/io/mono.js","./io/udp.js":"orca/core/io/udp.js","./io/osc.js":"orca/core/io/osc.js"}],"orca/sources/scripts/cursor.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cursor;

function Cursor(terminal) {
  this.x = 0;
  this.y = 0;
  this.w = 1;
  this.h = 1;
  this.mode = 0;
  this.block = [];

  this.move = function (x, y) {
    if (isNaN(x) || isNaN(y)) {
      return;
    }

    this.x = clamp(this.x + parseInt(x), 0, terminal.orca.w - 1);
    this.y = clamp(this.y - parseInt(y), 0, terminal.orca.h - 1);
    terminal.update();
  };

  this.moveTo = function (x, y) {
    if (!x || !y || isNaN(x) || isNaN(y)) {
      return;
    }

    this.x = clamp(parseInt(x), 0, terminal.orca.w - 1);
    this.y = clamp(parseInt(y), 0, terminal.orca.h - 1);
    terminal.update();
  };

  this.scale = function (x, y) {
    if (isNaN(x) || isNaN(y)) {
      return;
    }

    this.w = clamp(this.w + parseInt(x), 1, terminal.orca.w - this.x);
    this.h = clamp(this.h - parseInt(y), 1, terminal.orca.h - this.y);
    terminal.update();
  };

  this.scaleTo = function (w, h) {
    if (isNaN(w) || isNaN(h)) {
      return;
    }

    this.w = clamp(parseInt(w), 0, terminal.orca.w - 1);
    this.h = clamp(parseInt(h), 0, terminal.orca.h - 1);
    terminal.update();
  };

  this.resize = function (w, h) {
    if (isNaN(w) || isNaN(h)) {
      return;
    }

    this.w = clamp(parseInt(w), 1, terminal.orca.w - this.x);
    this.h = clamp(parseInt(h), 1, terminal.orca.h - this.y);
    terminal.update();
  };

  this.drag = function (x, y) {
    if (isNaN(x) || isNaN(y)) {
      return;
    }

    this.mode = 0;
    this.cut();
    this.move(x, y);
    this.paste();
  };

  this.selectAll = function () {
    this.x = 0;
    this.y = 0;
    this.w = terminal.orca.w;
    this.h = terminal.orca.h;
    this.mode = 0;
    terminal.update();
  };

  this.select = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.x;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.y;
    var w = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.w;
    var h = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.h;
    this.moveTo(x, y);
    this.scaleTo(w, h);
    terminal.update();
  };

  this.reset = function () {
    var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (pos) {
      this.x = 0;
      this.y = 0;
    }

    this.move(0, 0);
    this.w = 1;
    this.h = 1;
    this.mode = 0;
  };

  this.copy = function () {
    var block = this.getBlock();
    var rows = [];

    for (var i = 0; i < block.length; i++) {
      rows.push(block[i].join(''));
    }

    clipboard.writeText(rows.join('\n'));
  };

  this.cut = function () {
    this.copy();
    this.erase();
  };

  this.paste = function () {
    var overlap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    this.writeBlock(clipboard.readText().split(/\r?\n/), overlap);
  };

  this.read = function () {
    return terminal.orca.glyphAt(this.x, this.y);
  };

  this.write = function (g) {
    if (terminal.orca.write(this.x, this.y, g) && this.mode === 1) {
      this.move(1, 0);
    }

    terminal.history.record(terminal.orca.s);
  };

  this.erase = function () {
    this.eraseBlock(this.x, this.y, this.w, this.h);

    if (this.mode === 1) {
      this.move(-1, 0);
    }

    terminal.history.record(terminal.orca.s);
  };

  this.rotate = function () {
    var rate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    if (isNaN(rate)) {
      return;
    }

    var cols = terminal.cursor.getBlock();

    for (var y in cols) {
      for (var x in cols[y]) {
        if (!cols[y][x] || cols[y][x] === '.') {
          continue;
        }

        var isUC = cols[y][x] === cols[y][x].toUpperCase();
        var value = terminal.orca.valueOf(cols[y][x]);
        cols[y][x] = terminal.orca.keyOf(parseInt(rate) + value, isUC);
      }
    }

    terminal.cursor.writeBlock(cols);
  };

  this.find = function (str) {
    var i = terminal.orca.s.indexOf(str);

    if (i < 0) {
      return;
    }

    var pos = terminal.orca.posAt(i);
    this.w = str.length;
    this.h = 1;
    this.x = pos.x;
    this.y = pos.y;
  };

  this.trigger = function () {
    var operator = terminal.orca.operatorAt(this.x, this.y);

    if (!operator) {
      console.warn('Cursor', 'Nothing to trigger.');
      return;
    }

    console.log('Cursor', 'Trigger: ' + operator.name);
    operator.run(true);
  };

  this.toggleMode = function (val) {
    this.w = 1;
    this.h = 1;
    this.mode = this.mode === 0 ? val : 0;
  };

  this.inspect = function () {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var ports = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (this.w > 1 || this.h > 1) {
      return 'multi';
    }

    var port = terminal.portAt(this.x, this.y);

    if (port) {
      return "".concat(port[3]);
    }

    if (terminal.orca.lockAt(this.x, this.y)) {
      return 'locked';
    }

    return 'empty';
  };

  this.comment = function () {
    var block = this.getBlock();

    for (var id in block) {
      block[id][0] = block[id][0] === '#' ? '.' : '#';
      block[id][block[id].length - 1] = block[id][block[id].length - 1] === '#' ? '.' : '#';
    }

    this.writeBlock(block);
  }; // Block


  this.getBlock = function () {
    var rect = this.toRect();
    var block = [];

    for (var _y = rect.y; _y < rect.y + rect.h; _y++) {
      var line = [];

      for (var _x = rect.x; _x < rect.x + rect.w; _x++) {
        line.push(terminal.orca.glyphAt(_x, _y));
      }

      block.push(line);
    }

    return block;
  };

  this.writeBlock = function (block) {
    var overlap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!block || block.length === 0) {
      return;
    }

    var rect = this.toRect();
    var _y = rect.y;

    for (var x in block) {
      var _x = rect.x;

      for (var y in block[x]) {
        var glyph = block[x][y];
        terminal.orca.write(_x, _y, overlap === true && glyph === '.' ? terminal.orca.glyphAt(_x, _y) : glyph);
        _x++;
      }

      _y++;
    }

    terminal.history.record(terminal.orca.s);
  };

  this.eraseBlock = function (x, y, w, h) {
    if (isNaN(x) || isNaN(y) || isNaN(w) || isNaN(h)) {
      return;
    }

    for (var _y = y; _y < y + h; _y++) {
      for (var _x = x; _x < x + w; _x++) {
        terminal.orca.write(_x, _y, '.');
      }
    }

    terminal.history.record(terminal.orca.s);
  };

  this.toRect = function () {
    return {
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h
    };
  };

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{}],"orca/sources/scripts/source.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Source;

function Source(terminal) {
  this.path = null;
  this.queue = [];

  this.start = function () {
    this.increment();
    this.new();
  };

  this.new = function () {
    console.log('Source', 'Make a new file..');
    this.path = null;
    this.queue = [];
    terminal.orca.reset();
    terminal.resize();
    terminal.history.reset();
    terminal.cursor.reset();
    terminal.clock.play();
  };

  this.open = function () {
    console.log('Source', 'Open a file..');
  };

  this.save = function () {
    var quitAfter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    console.log('Source', 'Save a file..');
  };

  this.saveAs = function () {
    var quitAfter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    console.log('Source', 'Save a file as..');
  };

  this.revert = function () {
    if (!this.path) {
      return;
    }

    console.log('Source', 'Revert a file..');
  };

  this.inject = function (name) {
    var paste = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  }; // I/O


  this.write = function (loc) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.generate();
    var quitAfter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  };

  this.run = function () {
    if (!this.queue || this.queue.length < terminal.orca.f || !this.queue[terminal.orca.f]) {
      return;
    }

    terminal.commander.trigger(this.queue[terminal.orca.f]);
  };

  this.load = function (data) {
    var lines = data.split('\n').map(function (line) {
      return clean(line);
    });
    var w = lines[0].length;
    var h = lines.length;
    var s = lines.join('\n').trim();
    terminal.orca.load(w, h, s);
    terminal.history.reset();
    terminal.history.record(terminal.orca.s);
    terminal.fit();
  };

  this.quit = function () {};

  this.verify = function () {};

  this.hasChanges = function () {}; // LocalStorage


  this.resume = function () {
    this.read(this.recall('active'));
  };

  this.remember = function (key, val) {
    if (!key || !val) {
      return;
    }

    console.log('Source', "Remember: ".concat(key, "=").concat(val));
    localStorage.setItem(key, val);
  };

  this.recall = function (key) {
    if (!key) {
      return;
    }

    if (localStorage.hasOwnProperty(key)) {
      console.log('Source', "Recall: ".concat(key));
      return localStorage.getItem(key);
    }
  };

  this.forget = function (key) {
    if (!key) {
      return;
    }

    console.log('Source', "Forget: ".concat(key));
    localStorage.removeItem(key);
  };

  this.increment = function () {
    var val = this.recall('session');
    this.remember('session', isNaN(val) ? 1 : parseInt(val) + 1);
  }; // Converters


  this.generate = function () {
    var orca = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : terminal.orca;
    return "".concat(orca);
  };

  this.locate = function (name) {
    if (!this.path) {
      return;
    }

    var loc = path.join(this.folder(), name);
    return fs.existsSync(loc) ? loc : null;
  }; // Etc


  this.name = function () {
    return this.path ? path.basename(this.path, '.orca') : null;
  };

  this.folder = function () {
    return this.path ? path.dirname(this.path) : null;
  };

  this.toString = function () {
    return this.path ? this.name() : 'unsaved';
  };

  function isDifferent(a, b) {
    return a.replace(/[^a-zA-Z0-9+]+/gi, '').trim() !== b.replace(/[^a-zA-Z0-9+]+/gi, '').trim();
  }

  function clean(s) {
    var c = '';

    for (var x = 0; x <= s.length; x++) {
      var char = s.charAt(x);
      c += !terminal.orca.isAllowed(char) ? '.' : char;
    }

    return c;
  }
}
},{}],"orca/sources/scripts/history.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = History;

function History() {
  this.index = 0;
  this.frames = [];
  this.host = null;
  this.key = null;

  this.bind = function (host, key) {
    console.log("History is recording..");
    this.host = host;
    this.key = key;
    this.reset();
  };

  this.reset = function () {
    this.index = 0;
    this.frames = [];
  };

  this.record = function (data) {
    if (this.index === this.frames.length) {
      this.append(data);
    } else {
      this.fork(data);
    }

    this.trim();
    this.index = this.frames.length;
  };

  this.undo = function () {
    if (this.index === 0) {
      console.warn('History', 'Reached beginning');
      return;
    }

    this.index = clamp(this.index - 1, 0, this.frames.length - 2);
    this.apply(this.frames[this.index]);
  };

  this.redo = function () {
    if (this.index + 1 > this.frames.length - 1) {
      console.warn('History', 'Reached end');
      return;
    }

    this.index = clamp(this.index + 1, 0, this.frames.length - 1);
    this.apply(this.frames[this.index]);
  };

  this.apply = function (f) {
    if (!this.host[this.key]) {
      console.log("Unknown binding to key ".concat(this.key));
      return;
    }

    if (!f || f.length !== this.host[this.key].length) {
      return;
    }

    this.host[this.key] = this.frames[this.index];
  };

  this.append = function (data) {
    if (!data) {
      return;
    }

    if (this.frames[this.index - 1] && this.frames[this.index - 1] === data) {
      return;
    }

    this.frames.push(data);
  };

  this.fork = function (data) {
    this.frames = this.frames.slice(0, this.index + 1);
    this.append(data);
  };

  this.trim = function () {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;

    if (this.frames.length < limit) {
      return;
    }

    this.frames.shift();
  };

  this.last = function () {
    return this.frames[this.index - 1];
  };

  this.length = function () {
    return this.frames.length;
  };

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{}],"orca/sources/scripts/commander.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Commander;

function Commander(terminal) {
  var _this = this;

  this.isActive = false;
  this.query = '';
  this.history = [];
  this.historyIndex = 0; // Library

  this.passives = {
    'find': function find(val) {
      terminal.cursor.find(val);
    },
    'select': function select(val) {
      var rect = val.split(';');
      terminal.cursor.select(rect[0], rect[1], rect[2], rect[3]);
    },
    'inject': function inject(val) {
      terminal.source.inject(val, false);
    },
    'rot': function rot(val) {
      terminal.cursor.rotate(parseInt(val));
    },
    'write': function write(val) {
      var parts = val.split(';');
      terminal.cursor.select(parts[1], parts[2], parts[0].length);
    }
  };
  this.actives = {
    // Ports
    'osc': function osc(val) {
      terminal.io.osc.select(parseInt(val));
    },
    'udp': function udp(val) {
      terminal.io.udp.select(parseInt(val));
    },
    // Cursor
    'copy': function copy(val) {
      terminal.cursor.copy();
    },
    'paste': function paste(val) {
      terminal.cursor.paste(true);
    },
    'erase': function erase(val) {
      terminal.cursor.erase();
    },
    // Controls
    'play': function play(val) {
      terminal.clock.play();
    },
    'stop': function stop(val) {
      terminal.clock.stop();
    },
    'run': function run(val) {
      terminal.run();
    },
    // Speed
    'apm': function apm(val) {
      terminal.clock.set(null, parseInt(val));
    },
    'bpm': function bpm(val) {
      terminal.clock.set(parseInt(val), parseInt(val), true);
    },
    'time': function time(val) {
      terminal.clock.setFrame(parseInt(val));
    },
    'rewind': function rewind(val) {
      terminal.clock.setFrame(terminal.orca.f - parseInt(val));
    },
    'skip': function skip(val) {
      terminal.clock.setFrame(terminal.orca.f + parseInt(val));
    },
    // Themeing
    'color': function color(val) {
      var parts = val.split(';');
      terminal.theme.set('b_med', parts[0]);
      terminal.theme.set('b_inv', parts[1]);
      terminal.theme.set('b_high', parts[2]);
    },
    'graphic': function graphic(val) {
      terminal.theme.setImage(terminal.source.locate(val + '.jpg'));
    },
    // Edit
    'inject': function inject(val) {
      terminal.source.inject(val, true);
    },
    'write': function write(val) {
      var parts = val.split(';');
      terminal.cursor.select(parts[1], parts[2], parts[0].length);
      terminal.cursor.writeBlock([parts[0].split('')]);
    } // Make shorthands

  };

  for (var id in this.actives) {
    this.actives[id.substr(0, 2)] = this.actives[id];
  } // Begin


  this.start = function () {
    var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    this.isActive = true;
    this.query = q;
    terminal.update();
  };

  this.stop = function () {
    this.isActive = false;
    this.query = '';
    this.historyIndex = this.history.length;
    terminal.update();
  };

  this.erase = function () {
    this.query = this.query.slice(0, -1);
    this.preview();
  };

  this.write = function (key) {
    if (key.length !== 1) {
      return;
    }

    this.query += key;
    this.preview();
  };

  this.run = function () {
    var tool = this.isActive === true ? 'commander' : 'cursor';
    terminal[tool].trigger();
    terminal.update();
  };

  this.trigger = function () {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.query;
    var cmd = "".concat(msg).split(':')[0].toLowerCase();
    var val = "".concat(msg).substr(cmd.length + 1);

    if (!this.actives[cmd]) {
      console.warn("Unknown message: ".concat(msg));
      this.stop();
      return;
    }

    console.info('Commander', msg);
    this.actives[cmd](val, true);
    this.history.push(msg);
    this.historyIndex = this.history.length;
    this.stop();
  };

  this.preview = function () {
    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.query;
    var cmd = "".concat(msg).split(':')[0].toLowerCase();
    var val = "".concat(msg).substr(cmd.length + 1);

    if (!this.passives[cmd]) {
      return;
    }

    this.passives[cmd](val, false);
  }; // Events


  this.onKeyDown = function (event) {
    // Reset
    if ((event.metaKey || event.ctrlKey) && event.key === 'Backspace') {
      terminal.reset();
      event.preventDefault();
      return;
    }

    if (event.keyCode === 191 && (event.metaKey || event.ctrlKey)) {
      terminal.cursor.comment();
      event.preventDefault();
      return;
    } // Copy/Paste


    if (event.keyCode === 67 && (event.metaKey || event.ctrlKey)) {
      terminal.cursor.copy();
      event.preventDefault();
      return;
    }

    if (event.keyCode === 88 && (event.metaKey || event.ctrlKey)) {
      terminal.cursor.cut();
      event.preventDefault();
      return;
    }

    if (event.keyCode === 86 && (event.metaKey || event.ctrlKey) && event.shiftKey) {
      terminal.cursor.paste(true);
      event.preventDefault();
      return;
    }

    if (event.keyCode === 86 && (event.metaKey || event.ctrlKey)) {
      terminal.cursor.paste(false);
      event.preventDefault();
      return;
    }

    if (event.keyCode === 65 && (event.metaKey || event.ctrlKey)) {
      terminal.cursor.selectAll();
      event.preventDefault();
      return;
    } // Undo/Redo


    if (event.keyCode === 90 && (event.metaKey || event.ctrlKey) && event.shiftKey) {
      terminal.history.redo();
      event.preventDefault();
      return;
    }

    if (event.keyCode === 90 && (event.metaKey || event.ctrlKey)) {
      terminal.history.undo();
      event.preventDefault();
      return;
    }

    if (event.keyCode === 38) {
      this.onArrowUp(event.shiftKey, event.metaKey || event.ctrlKey, event.altKey);
      return;
    }

    if (event.keyCode === 40) {
      this.onArrowDown(event.shiftKey, event.metaKey || event.ctrlKey, event.altKey);
      return;
    }

    if (event.keyCode === 37) {
      this.onArrowLeft(event.shiftKey, event.metaKey || event.ctrlKey, event.altKey);
      return;
    }

    if (event.keyCode === 39) {
      this.onArrowRight(event.shiftKey, event.metaKey || event.ctrlKey, event.altKey);
      return;
    }

    if (event.keyCode === 9) {
      terminal.toggleHardmode();
      event.preventDefault();
      return;
    }

    if (event.metaKey) {
      return;
    }

    if (event.ctrlKey) {
      return;
    }

    if (event.key === ' ' && terminal.cursor.mode === 0) {
      terminal.clock.togglePlay();
      event.preventDefault();
      return;
    }

    if (event.key === 'Escape') {
      terminal.toggleGuide(false);
      terminal.commander.stop();
      terminal.clear();
      terminal.isPaused = false;
      terminal.cursor.reset();
      return;
    }

    if (event.key === 'Backspace') {
      terminal[this.isActive === true ? 'commander' : 'cursor'].erase();
      event.preventDefault();
      return;
    }

    if (event.key === ']') {
      terminal.modGrid(1, 0);
      event.preventDefault();
      return;
    }

    if (event.key === '[') {
      terminal.modGrid(-1, 0);
      event.preventDefault();
      return;
    }

    if (event.key === '}') {
      terminal.modGrid(0, 1);
      event.preventDefault();
      return;
    }

    if (event.key === '{') {
      terminal.modGrid(0, -1);
      event.preventDefault();
      return;
    }

    if (event.key === '>') {
      terminal.clock.mod(1);
      event.preventDefault();
      return;
    }

    if (event.key === '<') {
      terminal.clock.mod(-1);
      event.preventDefault();
      return;
    } // Route key to Operator or Cursor


    terminal[this.isActive === true ? 'commander' : 'cursor'].write(event.key);
  };

  this.onKeyUp = function (event) {
    terminal.update();
  };

  this.onArrowUp = function () {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var drag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // Navigate History
    if (this.isActive === true) {
      this.historyIndex -= this.historyIndex > 0 ? 1 : 0;
      this.start(this.history[this.historyIndex]);
      return;
    }

    var leap = skip ? terminal.grid.h : 1;
    terminal.toggleGuide(false);

    if (drag) {
      terminal.cursor.drag(0, leap);
    } else if (mod) {
      terminal.cursor.scale(0, leap);
    } else {
      terminal.cursor.move(0, leap);
    }
  };

  this.onArrowDown = function () {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var drag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    // Navigate History
    if (this.isActive === true) {
      this.historyIndex += this.historyIndex < this.history.length ? 1 : 0;
      this.start(this.history[this.historyIndex]);
      return;
    }

    var leap = skip ? terminal.grid.h : 1;
    terminal.toggleGuide(false);

    if (drag) {
      terminal.cursor.drag(0, -leap);
    } else if (mod) {
      terminal.cursor.scale(0, -leap);
    } else {
      terminal.cursor.move(0, -leap);
    }
  };

  this.onArrowLeft = function () {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var drag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var leap = skip ? terminal.grid.w : 1;
    terminal.toggleGuide(false);

    if (drag) {
      terminal.cursor.drag(-leap, 0);
    } else if (mod) {
      terminal.cursor.scale(-leap, 0);
    } else {
      terminal.cursor.move(-leap, 0);
    }
  };

  this.onArrowRight = function () {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var drag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var leap = skip ? terminal.grid.w : 1;
    terminal.toggleGuide(false);

    if (drag) {
      terminal.cursor.drag(leap, 0);
    } else if (mod) {
      terminal.cursor.scale(leap, 0);
    } else {
      terminal.cursor.move(leap, 0);
    }
  }; // Events


  document.onkeydown = function (event) {
    _this.onKeyDown(event);
  };

  document.onkeyup = function (event) {
    _this.onKeyUp(event);
  }; // UI


  this.toString = function () {
    return "".concat(this.query);
  };
}
},{}],"node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"node_modules/path-browserify/index.js":[function(require,module,exports) {
var process = require("process");
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

},{"process":"node_modules/process/browser.js"}],"orca/sources/scripts/clock.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Clock;

function Clock(terminal) {
  var path = require('path');

  this.isPaused = true;
  this.timer = null;
  this.isPuppet = false;
  this.speed = {
    value: 120,
    target: 120
  };

  this.start = function () {
    this.setTimer(120);
    this.play();
  };

  this.touch = function () {
    this.stop();
    terminal.run();
  };

  this.run = function () {
    if (this.speed.target === this.speed.value) {
      return;
    }

    this.set(this.speed.value + (this.speed.value < this.speed.target ? 1 : -1), null, true);
  };

  this.set = function (value) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var setTimer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (value) {
      this.speed.value = clamp(value, 60, 300);
    }

    if (target) {
      this.speed.target = clamp(target, 60, 300);
    }

    if (setTimer === true) {
      this.setTimer(this.speed.value);
    }
  };

  this.mod = function () {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (animate === true) {
      this.set(null, this.speed.target + mod);
    } else {
      this.set(this.speed.value + mod, this.speed.value + mod, true);
      terminal.update();
    }
  }; // Controls


  this.togglePlay = function () {
    // If in insert mode, insert space
    if (terminal.cursor.mode === 1) {
      terminal.cursor.move(1, 0);
      return;
    }

    if (this.isPaused === true) {
      this.play();
    } else {
      this.stop();
    }
  };

  this.play = function () {
    if (!this.isPaused) {
      console.warn('Already playing');
      return;
    }

    console.log('Clock', 'Play');
    this.isPaused = false;

    if (this.isPuppet) {
      return console.warn('External Midi control');
    }

    this.set(this.speed.target, this.speed.target, true);
  };

  this.stop = function () {
    if (this.isPaused) {
      console.warn('Already stopped');
      return;
    }

    console.log('Clock', 'Stop');
    terminal.io.midi.silence();
    this.isPaused = true;

    if (this.isPuppet) {
      return console.warn('External Midi control');
    }

    this.clearTimer();
  }; // External Clock


  var pulse = {
    count: 0,
    last: null,
    timer: null
  };

  this.tap = function () {
    var _this = this;

    pulse.last = performance.now();

    if (!this.isPuppet) {
      console.log('Clock', 'Puppeteering starts..');
      this.isPuppet = true;
      this.clearTimer();
      pulse.timer = setInterval(function () {
        if (performance.now() - pulse.last < 2000) {
          return;
        }

        _this.untap();
      }, 2000);
    }

    if (this.isPaused) {
      return;
    }

    pulse.count = pulse.count + 1;

    if (pulse.count % 6 === 0) {
      terminal.run();
      pulse.count = 0;
    }
  };

  this.untap = function () {
    console.log('Clock', 'Puppeteering stops..');
    clearInterval(pulse.timer);
    this.isPuppet = false;
    pulse.count = 1;
    pulse.last = null;
    this.setTimer(this.speed.value);
  }; // Timer


  this.setTimer = function (bpm) {
    console.log('Clock', 'New Timer ' + bpm + 'bpm');
    this.clearTimer();
    this.timer = new Worker("/timer.3438a9a2.js");
    this.timer.postMessage(60000 / bpm / 4);

    this.timer.onmessage = function (event) {
      terminal.run();
    };
  }; // this.setTimer = function (bpm) {
  //   this.clearTimer()
  //   this.timer = setInterval(() => { terminal.run(); }, (60000 / bpm) / 4)
  // }


  this.clearTimer = function () {
    if (this.timer) {
      this.timer.terminate();
    }

    this.timer = null;
  };

  this.setFrame = function (f) {
    if (isNaN(f)) {
      return;
    }

    terminal.orca.f = clamp(f, 0, 9999999);
  };

  this.resetFrame = function () {
    terminal.orca.f = 0;
  }; // UI


  this.toString = function () {
    var diff = this.speed.target - this.speed.value;

    var _offset = Math.abs(diff) > 5 ? diff > 0 ? "+".concat(diff) : diff : '';

    var _message = this.isPuppet ? 'midi' : "".concat(this.speed.value).concat(_offset);

    var _beat = diff === 0 && terminal.orca.f % 4 === 0 ? '*' : '';

    return "".concat(_message).concat(_beat);
  };

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{"path":"node_modules/path-browserify/index.js","./timer.js":[["timer.3438a9a2.js","orca/sources/scripts/timer.js"],"timer.3438a9a2.js.map","orca/sources/scripts/timer.js"]}],"node_modules/parcel/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"node_modules/node-libs-browser/node_modules/punycode/punycode.js":[function(require,module,exports) {
var global = arguments[3];
var define;
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

},{}],"node_modules/url/util.js":[function(require,module,exports) {
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],"node_modules/querystring-es3/decode.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict'; // If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function (qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);
  var maxKeys = 1000;

  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length; // maxKeys <= 0 means that we should not limit keys count

  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr,
        vstr,
        k,
        v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};
},{}],"node_modules/querystring-es3/encode.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

var stringifyPrimitive = function (v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function (obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';

  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function (k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;

      if (isArray(obj[k])) {
        return map(obj[k], function (v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);
  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map(xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];

  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }

  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }

  return res;
};
},{}],"node_modules/querystring-es3/index.js":[function(require,module,exports) {
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');
},{"./decode":"node_modules/querystring-es3/decode.js","./encode":"node_modules/querystring-es3/encode.js"}],"node_modules/url/url.js":[function(require,module,exports) {
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"punycode":"node_modules/node-libs-browser/node_modules/punycode/punycode.js","./util":"node_modules/url/util.js","querystring":"node_modules/querystring-es3/index.js"}],"orca/sources/scripts/lib/theme.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Theme;

function Theme(_default) {
  var fs = require('fs');

  var url = require('url');

  var themer = this;
  this.active = _default;
  this.el = document.createElement('style');
  this.el.type = 'text/css';

  this.install = function () {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    host.appendChild(this.el);
    this.callback = callback;
  };

  this.start = function () {
    console.log('Theme', 'Starting..');

    if (isJson(localStorage.theme)) {
      var storage = JSON.parse(localStorage.theme);

      if (validate(storage)) {
        console.log('Theme', 'Loading localStorage..');
        this.load(storage);
        return;
      }
    }

    this.load(_default);
  };

  this.load = function (data) {
    var theme = parse(data);

    if (!validate(theme)) {
      console.warn('Theme', 'Not a theme', theme);
      return;
    }

    console.log('Theme', "Loaded theme!");
    this.el.innerHTML = ":root { --background: ".concat(theme.background, "; --f_high: ").concat(theme.f_high, "; --f_med: ").concat(theme.f_med, "; --f_low: ").concat(theme.f_low, "; --f_inv: ").concat(theme.f_inv, "; --b_high: ").concat(theme.b_high, "; --b_med: ").concat(theme.b_med, "; --b_low: ").concat(theme.b_low, "; --b_inv: ").concat(theme.b_inv, "; }");
    localStorage.setItem('theme', JSON.stringify(theme));
    this.active = theme;

    if (this.callback) {
      this.callback();
    }
  };

  this.reset = function () {
    this.load(_default);
  };

  this.setImage = function (path) {
    document.body.style.backgroundImage = path && fs.existsSync(path) && document.body.style.backgroundImage !== "url(".concat(url.pathToFileURL(path), ")") ? "url(".concat(url.pathToFileURL(path), ")") : '';
  };

  this.set = function (key, value) {
    if (!this.active[key]) {
      console.warn('Theme', 'Unknown key ' + key);
      return;
    }

    if (!isColor(value)) {
      console.warn('Theme', 'Not a color ' + value);
      return;
    }

    this.active[key] = value;
  };

  function parse(any) {
    if (any && any.background) {
      return any;
    } else if (any && any.data) {
      return any.data;
    } else if (any && isJson(any)) {
      return JSON.parse(any);
    } else if (any && isHtml(any)) {
      return extract(any);
    }

    return null;
  } // Drag


  this.drag = function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  this.drop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    var file = e.dataTransfer.files[0];

    if (!file || !file.name) {
      console.warn('Theme', 'Unnamed file.');
      return;
    }

    if (file.name.indexOf('.thm') < 0 && file.name.indexOf('.svg') < 0) {
      console.warn('Theme', 'Skipped, not a theme');
      return;
    }

    var reader = new FileReader();

    reader.onload = function (e) {
      themer.load(e.target.result);
    };

    reader.readAsText(file);
  };

  this.open = function () {};

  window.addEventListener('dragover', this.drag);
  window.addEventListener('drop', this.drop); // Helpers

  function validate(json) {
    if (!json) {
      return false;
    }

    if (!json.background) {
      return false;
    }

    if (!json.f_high) {
      return false;
    }

    if (!json.f_med) {
      return false;
    }

    if (!json.f_low) {
      return false;
    }

    if (!json.f_inv) {
      return false;
    }

    if (!json.b_high) {
      return false;
    }

    if (!json.b_med) {
      return false;
    }

    if (!json.b_low) {
      return false;
    }

    if (!json.b_inv) {
      return false;
    }

    return true;
  }

  function extract(text) {
    var svg = new DOMParser().parseFromString(text, 'text/xml');

    try {
      return {
        'background': svg.getElementById('background').getAttribute('fill'),
        'f_high': svg.getElementById('f_high').getAttribute('fill'),
        'f_med': svg.getElementById('f_med').getAttribute('fill'),
        'f_low': svg.getElementById('f_low').getAttribute('fill'),
        'f_inv': svg.getElementById('f_inv').getAttribute('fill'),
        'b_high': svg.getElementById('b_high').getAttribute('fill'),
        'b_med': svg.getElementById('b_med').getAttribute('fill'),
        'b_low': svg.getElementById('b_low').getAttribute('fill'),
        'b_inv': svg.getElementById('b_inv').getAttribute('fill')
      };
    } catch (err) {
      console.warn('Theme', 'Incomplete SVG Theme', err);
    }
  }

  function isJson(text) {
    try {
      JSON.parse(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  function isColor(str) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + str);
  }

  function isHtml(text) {
    try {
      new DOMParser().parseFromString(text, 'text/xml');
      return true;
    } catch (error) {
      return false;
    }
  }
}
},{"fs":"node_modules/parcel/src/builtins/_empty.js","url":"node_modules/url/url.js"}],"orca/sources/scripts/lib/controller.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Controller;

function Controller() {
  var fs = require('fs');

  this.menu = {
    default: {}
  };
  this.mode = 'default';

  this.start = function () {};

  this.add = function (mode, cat, label, fn, accelerator) {
    if (!this.menu[mode]) {
      this.menu[mode] = {};
    }

    if (!this.menu[mode][cat]) {
      this.menu[mode][cat] = {};
    }

    this.menu[mode][cat][label] = {
      fn: fn,
      accelerator: accelerator
    };
  };

  this.addRole = function (mode, cat, label) {
    if (!this.menu[mode]) {
      this.menu[mode] = {};
    }

    if (!this.menu[mode][cat]) {
      this.menu[mode][cat] = {};
    }

    this.menu[mode][cat][label] = {
      role: label
    };
  };

  this.addSpacer = function (mode, cat, label) {
    var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'separator';

    if (!this.menu[mode]) {
      this.menu[mode] = {};
    }

    if (!this.menu[mode][cat]) {
      this.menu[mode][cat] = {};
    }

    this.menu[mode][cat][label] = {
      type: type
    };
  };

  this.clearCat = function (mode, cat) {
    if (this.menu[mode]) {
      this.menu[mode][cat] = {};
    }
  };

  this.set = function () {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
    this.mode = mode;
    this.commit();
  };

  this.format = function () {
    var f = [];
    var m = this.menu[this.mode];

    for (var _cat in m) {
      var submenu = [];

      for (var name in m[_cat]) {
        var option = m[_cat][name];

        if (option.role) {
          submenu.push({
            role: option.role
          });
        } else if (option.type) {
          submenu.push({
            type: option.type
          });
        } else {
          submenu.push({
            label: name,
            accelerator: option.accelerator,
            click: option.fn
          });
        }
      }

      f.push({
        label: _cat,
        submenu: submenu
      });
    }

    return f;
  };

  this.commit = function () {
    console.log('Controller', 'Changing..');
  };

  this.accelerator = function (key, menu) {
    var acc = {
      basic: null,
      ctrl: null
    };

    for (cat in menu) {
      var options = menu[cat];

      for (var id in options.submenu) {
        var option = options.submenu[id];

        if (option.role) {
          continue;
        }

        acc.basic = option.accelerator.toLowerCase() === key.toLowerCase() ? option.label.toUpperCase().replace('TOGGLE ', '').substr(0, 8).trim() : acc.basic;
        acc.ctrl = option.accelerator.toLowerCase() === ('CmdOrCtrl+' + key).toLowerCase() ? option.label.toUpperCase().replace('TOGGLE ', '').substr(0, 8).trim() : acc.ctrl;
      }
    }

    return acc;
  };

  this.docs = function () {
    // TODO
    console.log(this.menu.default);
  };
}
},{"fs":"node_modules/parcel/src/builtins/_empty.js"}],"orca/sources/scripts/terminal.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Terminal;

var _orca = _interopRequireDefault(require("../../core/orca.js"));

var _io = _interopRequireDefault(require("../../core/io.js"));

var _cursor = _interopRequireDefault(require("./cursor.js"));

var _source = _interopRequireDefault(require("./source.js"));

var _history = _interopRequireDefault(require("./history.js"));

var _commander = _interopRequireDefault(require("./commander.js"));

var _clock = _interopRequireDefault(require("./clock.js"));

var _theme = _interopRequireDefault(require("./lib/theme.js"));

var _controller = _interopRequireDefault(require("./lib/controller.js"));

var _library = _interopRequireDefault(require("../../core/library.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Terminal() {
  this.version = 132;
  this.library = _library.default;
  this.orca = new _orca.default(this);
  this.io = new _io.default(this);
  this.cursor = new _cursor.default(this);
  this.source = new _source.default(this);
  this.commander = new _commander.default(this);
  this.clock = new _clock.default(this);
  this.history = new _history.default();
  this.controller = new _controller.default(); // Themes

  this.theme = new _theme.default({
    background: '#000000',
    f_high: '#ffffff',
    f_med: '#777777',
    f_low: '#444444',
    f_inv: '#000000',
    b_high: '#eeeeee',
    b_med: '#72dec2',
    b_low: '#444444',
    b_inv: '#ffb545'
  });
  this.el = document.createElement('canvas');
  this.context = this.el.getContext('2d'); // Settings

  this.grid = {
    w: 8,
    h: 8
  };
  this.tile = {
    w: +localStorage.getItem('tilew') || 10,
    h: +localStorage.getItem('tileh') || 15
  };
  this.scale = window.devicePixelRatio;
  this.hardmode = true;
  this.guide = false;

  this.install = function (host) {
    host.appendChild(this.el);
    this.theme.install(host);
  };

  this.start = function () {
    this.theme.start();
    this.io.start();
    this.source.start();
    this.history.bind(this.orca, 's');
    this.history.record(this.orca.s);
    this.clock.start();
    this.update();
    this.el.className = 'ready';
    this.toggleGuide(this.reqGuide() === true);
  };

  this.run = function () {
    this.io.clear();
    this.clock.run();
    this.source.run();
    this.orca.run();
    this.io.run();
    this.update();
  };

  this.update = function () {
    if (document.hidden === true) {
      return;
    }

    this.clear();
    this.ports = this.findPorts();
    this.drawProgram();
    this.drawInterface();
    this.drawGuide();
  };

  this.reset = function () {
    this.theme.reset();
  };

  this.setGrid = function (w, h) {
    this.grid.w = w;
    this.grid.h = h;
    this.update();
  };

  this.toggleRetina = function () {
    this.scale = this.scale === 1 ? window.devicePixelRatio : 1;
    console.log('Terminal', "Pixel resolution: ".concat(this.scale));
    this.resize(true);
  };

  this.toggleHardmode = function () {
    this.hardmode = this.hardmode !== true;
    console.log('Terminal', "Hardmode: ".concat(this.hardmode));
    this.update();
  };

  this.toggleGuide = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var display = force !== null ? force : this.guide !== true;

    if (display === this.guide) {
      return;
    }

    console.log('Terminal', "Toggle Guide: ".concat(display));
    this.guide = display;
    this.update();
  };

  this.reqGuide = function () {
    var session = this.source.recall('session');
    console.log('Terminal', 'Session #' + session);

    if (!session || parseInt(session) < 20) {
      return true;
    }

    return false;
  };

  this.modGrid = function () {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var w = clamp(this.grid.w + x, 4, 16);
    var h = clamp(this.grid.h + y, 4, 16);
    this.setGrid(w, h);
  };

  this.modZoom = function () {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    this.tile = {
      w: reset ? 10 : this.tile.w * (mod + 1),
      h: reset ? 15 : this.tile.h * (mod + 1)
    };
    localStorage.setItem('tilew', this.tile.w);
    localStorage.setItem('tileh', this.tile.h);
    this.resize(true);
  }; //


  this.isCursor = function (x, y) {
    return x === this.cursor.x && y === this.cursor.y;
  };

  this.isSelection = function (x, y) {
    return !!(x >= this.cursor.x && x < this.cursor.x + this.cursor.w && y >= this.cursor.y && y < this.cursor.y + this.cursor.h);
  };

  this.isMarker = function (x, y) {
    return x % this.grid.w === 0 && y % this.grid.h === 0;
  };

  this.isNear = function (x, y) {
    return x > parseInt(this.cursor.x / this.grid.w) * this.grid.w - 1 && x <= (1 + parseInt(this.cursor.x / this.grid.w)) * this.grid.w && y > parseInt(this.cursor.y / this.grid.h) * this.grid.h - 1 && y <= (1 + parseInt(this.cursor.y / this.grid.h)) * this.grid.h;
  };

  this.isAligned = function (x, y) {
    return x === this.cursor.x || y === this.cursor.y;
  };

  this.isEdge = function (x, y) {
    return x === 0 || y === 0 || x === this.orca.w - 1 || y === this.orca.h - 1;
  };

  this.isLocals = function (x, y) {
    return this.isNear(x, y) === true && (x % (this.grid.w / 4) === 0 && y % (this.grid.h / 4) === 0) === true;
  };

  this.portAt = function (x, y) {
    return this.ports[this.orca.indexAt(x, y)];
  };

  this.findPorts = function () {
    var a = new Array(this.orca.w * this.orca.h - 1);

    for (var id in this.orca.runtime) {
      var operator = this.orca.runtime[id];

      if (this.orca.lockAt(operator.x, operator.y)) {
        continue;
      }

      var ports = operator.getPorts();

      for (var i in ports) {
        var port = ports[i];
        var index = this.orca.indexAt(port[0], port[1]);
        a[index] = port;
      }
    }

    return a;
  }; // Interface


  this.makeGlyph = function (x, y) {
    var g = this.orca.glyphAt(x, y);

    if (g !== '.') {
      return g;
    }

    if (this.isCursor(x, y)) {
      return this.isPaused ? '~' : '@';
    }

    if (this.isMarker(x, y)) {
      return '+';
    }

    return g;
  };

  this.makeStyle = function (x, y, glyph, selection) {
    var isLocked = this.orca.lockAt(x, y);
    var port = this.ports[this.orca.indexAt(x, y)];

    if (this.isSelection(x, y)) {
      return 4;
    }

    if (!port && glyph === '.' && isLocked === false && this.hardmode === true) {
      return this.isLocals(x, y) === true ? 9 : 7;
    }

    if (selection === glyph && isLocked === false && selection !== '.') {
      return 6;
    }

    if (glyph === '*' && isLocked === false) {
      return 6;
    }

    if (port) {
      return port[2];
    }

    if (isLocked === true) {
      return 5;
    }

    return 9;
  };

  this.makeTheme = function (type) {
    // Operator
    if (type === 0) {
      return {
        bg: this.theme.active.b_med,
        fg: this.theme.active.f_low
      };
    } // Haste


    if (type === 1) {
      return {
        fg: this.theme.active.b_med
      };
    } // Input


    if (type === 2) {
      return {
        fg: this.theme.active.b_high
      };
    } // Output


    if (type === 3) {
      return {
        bg: this.theme.active.b_high,
        fg: this.theme.active.f_low
      };
    } // Selected


    if (type === 4) {
      return {
        bg: this.theme.active.b_inv,
        fg: this.theme.active.f_inv
      };
    } // Locked


    if (type === 5) {
      return {
        fg: this.theme.active.f_med
      };
    } // Reader


    if (type === 6) {
      return {
        fg: this.theme.active.b_inv
      };
    } // Invisible


    if (type === 7) {
      return {};
    } // Reader


    if (type === 8) {
      return {
        bg: this.theme.active.b_low,
        fg: this.theme.active.f_high
      };
    } // Reader+Background


    if (type === 10) {
      return {
        bg: this.theme.active.background,
        fg: this.theme.active.f_high
      };
    } // Default


    return {
      fg: this.theme.active.f_low
    };
  }; // Canvas


  this.clear = function () {
    this.context.clearRect(0, 0, this.el.width, this.el.height);
  };

  this.drawProgram = function () {
    var selection = this.cursor.read();

    for (var y = 0; y < this.orca.h; y++) {
      for (var x = 0; x < this.orca.w; x++) {
        var glyph = this.makeGlyph(x, y);
        var style = this.makeStyle(x, y, glyph, selection);
        this.drawSprite(x, y, glyph, style);
      }
    }
  };

  this.drawInterface = function () {
    var col = this.grid.w;
    var variables = Object.keys(this.orca.variables).join('');
    var col1 = this.orca.h;
    var col2 = this.orca.h + 1;

    if (this.commander.isActive === true) {
      this.write("".concat(this.commander.query).concat(this.orca.f % 2 === 0 ? '_' : ''), col * 0, this.orca.h + 1, this.grid.w * 2);
    } else {
      this.write("".concat(this.cursor.x, ",").concat(this.cursor.y).concat(this.cursor.mode === 1 ? '+' : ''), col * 0, this.orca.h + 1, this.grid.w, this.cursor.mode === 1 ? 1 : 2);
      this.write("".concat(this.cursor.w, ":").concat(this.cursor.h), col * 1, this.orca.h + 1, this.grid.w);
      this.write("".concat(this.cursor.inspect()), col * 2, this.orca.h + 1, this.grid.w);
      this.write("".concat(this.orca.f, "f").concat(this.isPaused ? '*' : ''), col * 3, this.orca.h + 1, this.grid.w);
    }

    this.write("".concat(this.orca.w, "x").concat(this.orca.h), col * 0, this.orca.h, this.grid.w);
    this.write("".concat(this.grid.w, "/").concat(this.grid.h).concat(this.tile.w !== 10 ? ' ' + (this.tile.w / 10).toFixed(1) : ''), col * 1, this.orca.h, this.grid.w); //this.write(`${this.source}`, col * 2, this.orca.h, this.grid.w, this.source.queue.length > terminal.orca.f ? 3 : 2)

    this.write("".concat(this.clock), col * 3, this.orca.h, this.grid.w, this.io.midi.inputIndex > -1 ? 3 : 2);

    if (this.orca.f < 15) {
      this.write("".concat(this.io.midi), col * 4, this.orca.h, this.grid.w * 2);
      this.write("Version ".concat(this.version), col * 4, this.orca.h + 1, this.grid.w * 2);
    } else {
      this.write("".concat(this.io.inspect(this.grid.w)), col * 4, this.orca.h, this.grid.w);
      this.write("".concat(display(variables, this.orca.f, this.grid.w)), col * 4, this.orca.h + 1, this.grid.w);
    }
  };

  this.drawGuide = function () {
    if (this.guide !== true) {
      return;
    }

    var operators = Object.keys(this.library).filter(function (val) {
      return isNaN(val);
    });

    for (var id in operators) {
      var key = operators[id];
      var oper = new this.library[key]();
      var text = oper.info;
      var frame = this.orca.h - 4;
      var x = Math.floor(parseInt(id) / frame) * 32 + 2;
      var y = parseInt(id) % frame + 2;
      this.write(key, x, y, 99, 3);
      this.write(text, x + 2, y, 99, 10);
    }
  };

  this.drawSprite = function (x, y, g, type) {
    var theme = this.makeTheme(type);

    if (theme.bg) {
      var bgrect = {
        x: x * this.tile.w * this.scale,
        y: y * this.tile.h * this.scale,
        w: this.tile.w * this.scale,
        h: this.tile.h * this.scale
      };
      this.context.fillStyle = theme.bg;
      this.context.fillRect(bgrect.x, bgrect.y, bgrect.w, bgrect.h);
    }

    if (theme.fg) {
      var fgrect = {
        x: (x + 0.5) * this.tile.w * this.scale,
        y: (y + 1) * this.tile.h * this.scale,
        w: this.tile.w * this.scale,
        h: this.tile.h * this.scale
      };
      this.context.fillStyle = theme.fg;
      this.context.fillText(g, fgrect.x, fgrect.y);
    }
  };

  this.write = function (text, offsetX, offsetY) {
    var limit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
    var type = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2;
    var x = 0;

    while (x < text.length && x < limit - 1) {
      this.drawSprite(offsetX + x, offsetY, text.substr(x, 1), type);
      x += 1;
    }
  }; // Resize tools


  this.fit = function () {// const size = { w: (this.orca.w * this.tile.w) + 60, h: (this.orca.h * this.tile.h) + 60 + (2 * this.tile.h) }
    // const win = require('electron').remote.getCurrentWindow()
    // const winSize = win.getSize()
    // const current = { w: winSize[0], h: winSize[1] }
    // if (current.w === size.w && current.h === size.h) { console.warn('Terminal', 'No resize required.'); return }
    // console.log('Source', `Fit terminal for ${this.orca.w}x${this.orca.h}(${size.w}x${size.h})`)
    // win.setSize(parseInt(size.w), parseInt(size.h), false)
    // this.resize()
  };

  this.resize = function () {
    var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var size = {
      w: window.innerWidth - 60,
      h: window.innerHeight - (60 + this.tile.h * 2)
    };
    var tiles = {
      w: Math.ceil(size.w / this.tile.w),
      h: Math.ceil(size.h / this.tile.h)
    };

    if (this.orca.w === tiles.w && this.orca.h === tiles.h && force === false) {
      return;
    } // Limit Tiles to Bounds


    var bounds = this.orca.bounds();

    if (tiles.w <= bounds.w) {
      tiles.w = bounds.w + 1;
    }

    if (tiles.h <= bounds.h) {
      tiles.h = bounds.h + 1;
    }

    this.crop(tiles.w, tiles.h); // Keep cursor in bounds

    if (this.cursor.x >= tiles.w) {
      this.cursor.x = tiles.w - 1;
    }

    if (this.cursor.y >= tiles.h) {
      this.cursor.y = tiles.h - 1;
    }

    console.log("Resized to: ".concat(tiles.w, "x").concat(tiles.h));
    this.el.width = this.tile.w * this.orca.w * this.scale;
    this.el.height = (this.tile.h + this.tile.h / 5) * this.orca.h * this.scale;
    this.el.style.width = "".concat(Math.ceil(this.tile.w * this.orca.w), "px");
    this.el.style.height = "".concat(Math.ceil((this.tile.h + this.tile.h / 5) * this.orca.h), "px");
    this.context.textBaseline = 'bottom';
    this.context.textAlign = 'center';
    this.context.font = "".concat(this.tile.h * 0.75 * this.scale, "px input_mono_medium");
    this.update();
  };

  this.crop = function (w, h) {
    var _this = this;

    var block = "".concat(this.orca);

    if (h > this.orca.h) {
      block = "".concat(block).concat("\n".concat('.'.repeat(this.orca.w)).repeat(h - this.orca.h));
    } else if (h < this.orca.h) {
      block = "".concat(block).split('\n').slice(0, h - this.orca.h).join('\n').trim();
    }

    if (w > this.orca.w) {
      block = "".concat(block).split('\n').map(function (val) {
        return val + '.'.repeat(w - _this.orca.w);
      }).join('\n').trim();
    } else if (w < this.orca.w) {
      block = "".concat(block).split('\n').map(function (val) {
        return val.substr(0, val.length + (w - _this.orca.w));
      }).join('\n').trim();
    }

    this.history.reset();
    this.orca.load(w, h, block, this.orca.f);
  }; // Docs


  this.docs = function () {
    var html = '';
    var operators = Object.keys(_library.default).filter(function (val) {
      return isNaN(val);
    });

    for (var id in operators) {
      var oper = new this.library[operators[id]]();
      var ports = oper.ports.input ? Object.keys(oper.ports.input).reduce(function (acc, key, val) {
        return acc + ' ' + key;
      }, '') : '';
      html += "- `".concat(oper.glyph.toUpperCase(), "` **").concat(oper.name, "**").concat(ports !== '' ? '(' + ports.trim() + ')' : '', ": ").concat(oper.info, ".\n");
    }

    return html;
  }; // Events


  window.addEventListener('dragover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });
  window.addEventListener('drop', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var file = e.dataTransfer.files[0];
    var path = file.path ? file.path : file.name;

    if (!path || path.indexOf('.orca') < 0) {
      console.log('Orca', 'Not a orca file');
      return;
    }

    terminal.source.read(path);
  });

  window.onresize = function (event) {} //terminal.resize()
  // Helpers
  ;

  function display(str, f, max) {
    return str.length < max ? str : str.slice(f % str.length) + str.substr(0, f % str.length);
  }

  function clamp(v, min, max) {
    return v < min ? min : v > max ? max : v;
  }
}
},{"../../core/orca.js":"orca/core/orca.js","../../core/io.js":"orca/core/io.js","./cursor.js":"orca/sources/scripts/cursor.js","./source.js":"orca/sources/scripts/source.js","./history.js":"orca/sources/scripts/history.js","./commander.js":"orca/sources/scripts/commander.js","./clock.js":"orca/sources/scripts/clock.js","./lib/theme.js":"orca/sources/scripts/lib/theme.js","./lib/controller.js":"orca/sources/scripts/lib/controller.js","../../core/library.js":"orca/core/library.js"}],"entry.js":[function(require,module,exports) {
var Terminal = require('./orca/sources/scripts/terminal').default;

console.log(Terminal);
var terminal = new Terminal();

window.onload = function () {
  terminal.install(document.getElementById('orcaShell'));
  terminal.start();
  console.log('checking serviceworker');

  if ('serviceWorker' in navigator) {
    console.log('register');
    navigator.serviceWorker.register("/service-worker.js").then(function (registration) {
      console.log('Registered:', registration);
    }).catch(function (error) {
      console.log('Registration failed: ', error);
    });
  }

  function open(url) {
    window.fetch(url).then(function (resp) {
      return resp.text();
    }).then(function (text) {
      var lines = text.split('\n');
      var w = lines[0].length;
      var h = lines.length;
      var s = lines.join('\n').trim();
      var o = terminal.orca.load(w, h, s);
      terminal.load(o);
    });
  }

  var load = document.getElementById('loadButton');

  load.onclick = function () {
    var url = window.prompt('enter orca url');
    if (!url || !url.length) return;
    open(url);
  }; // check the hash


  var url = window.location.hash;
  if (!url.length) return;
  url = decodeURIComponent(url.substring(1));
  open(url);
};
},{"./orca/sources/scripts/terminal":"orca/sources/scripts/terminal.js","./service-worker.js":[["service-worker.js","service-worker.js"],"service-worker.js.map","service-worker.js"]}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54490" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","entry.js"], null)
//# sourceMappingURL=/entry.87c11fe2.js.map