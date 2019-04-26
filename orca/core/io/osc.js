'use strict'


function Osc (terminal) {

  this.start = function () {
    console.info('OSC Starting..')
  }

  this.clear = function () {
  }

  this.run = function () {
  }

  this.send = function (path, msg) {
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

module.exports = Osc
