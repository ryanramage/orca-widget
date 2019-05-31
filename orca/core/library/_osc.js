'use strict'

import Operator from '../operator.js'

export default function OperatorOsc (orca, x, y, passive) {
  Operator.call(this, orca, x, y, '=', true)

  this.name = 'osc'
  this.info = 'Sends OSC message'

  this.ports.path = { x: 1, y: 0 }

  this.operation = function (force = false) {
    if (!this.hasNeighbor('*') && force === false) { return }

    this.path = this.listen(this.ports.path)

    if (!this.path || this.path === '.') { return }

    this.msg = ''

    for (let x = 2; x <= 36; x++) {
      const g = orca.glyphAt(this.x + x, this.y)
      if (g === '.') { break }
      orca.lock(this.x + x, this.y)
      this.msg += g
    }

    this.draw = false
    terminal.io.osc.send('/' + this.path, this.msg)

    if (force === true) {
      terminal.io.osc.run()
    }
  }
}
