'use strict'

export default function Udp (terminal) {
  this.stack = []
  this.port = null
  this.options = { default: 49161, orca: 49160 }

  this.start = function () {
    console.info('UDP Starting..')
  }

  this.clear = function () {
    this.stack = []
  }

  this.run = function () {
    for (const id in this.stack) {
      this.play(this.stack[id])
    }
  }

  this.send = function (msg) {
    this.stack.push(msg)
  }

  this.play = function (data) {
  }

  this.select = function (port = this.options.default) {
  }

  this.update = function () {
  }


}
