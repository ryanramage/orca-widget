'use strict'


function Udp (terminal) {
  this.stack = []
  this.port = null
  this.options = { default: 49161, orca: 49160 }

  this.start = function () {
    console.info('UDP Starting..')
  }

  this.clear = function () {
  }

  this.run = function () {
  }

  this.send = function (msg) {
    window.udp(msg)
  }

  this.play = function (data) {
    console.log('play', data)
  }

  this.select = function (port = this.options.default) {
  }

  this.update = function () {
  }

}

module.exports = Udp
