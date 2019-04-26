'use strict'

const Operator = require('../operator')

function OperatorOsc (orca, x, y, passive) {
  Operator.call(this, orca, x, y, '=', true)

  this.name = 'osc'
  this.info = 'Sends a OSC message.'

  this.ports.input.path = { x: 1, y: 0 }

  this.haste = function () {
    this.path = this.listen(this.ports.input.path)
    this.msg = ''
    for (let x = 2; x <= 36; x++) {
      const g = orca.glyphAt(this.x + x, this.y)
      if (g === '.') { break }
      orca.lock(this.x + x, this.y)
      this.msg += g
    }
  }

  this.run = function (force = false) {
    if (!this.bang() && force === false) { return }
    if (!this.path || this.path === '') { return }
    this.draw = false
    terminal.io.osc.send('/' + this.path, this.msg)
  }
}

module.exports = OperatorOsc
