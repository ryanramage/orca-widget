'use strict'


export default function Osc (terminal) {
  this.stack = []
  this.port = null
  this.options = { default: 49162, tidalCycles: 6010, sonicPi: 4559, superCollider: 57120 }

  this.start = function () {
    console.info('OSC Starting..')
  }

  this.clear = function () {
    this.stack = []
  }

  this.run = function () {
    for (const id in this.stack) {
      this.play(this.stack[id])
    }
  }

  this.send = function (path, msg) {
    this.stack.push({ path, msg })
  }

  this.play = function ({ path, msg }) {
  }

  this.select = function (port = this.options.default) {
  }

  this.update = function () {
  }

  this.setup = function (ip = '127.0.0.1') {
  }
}
