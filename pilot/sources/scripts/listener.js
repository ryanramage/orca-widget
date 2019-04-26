'use strict'


function Listener (pilot) {

  this.server = {} // mock a server for now
  window.udp = function (msg) {
    pilot.mixer.run(`${msg}`)
  }
}

module.exports = Listener
