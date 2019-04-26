'use strict'

const Tone = require('tone')

function Recorder (pilot) {
  this.el = document.createElement('div')
  this.el.id = 'recorder'
  this.el.className = 'blink'
  this.el.textContent = '•'
  this.isRecording = false

  let chunks = []

  this.install = function (host) {
    console.log('Recorder', 'Installing..')

    pilot.mixer.hook = Tone.context.createMediaStreamDestination()
    pilot.mixer.recorder = new MediaRecorder(pilot.mixer.hook.stream)
    pilot.mixer.masters.volume.connect(pilot.mixer.hook)

    pilot.mixer.recorder.onstop = evt => {
      const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
      pilot.recorder.save(blob)
    }

    pilot.mixer.recorder.ondataavailable = evt => {
      chunks.push(evt.data)
    }

    host.appendChild(this.el)
  }

  this.start = function () {
    console.log('Recorder', 'Starting..')
    this.isRecording = true
    chunks = []
    pilot.mixer.recorder.start()
    pilot.el.className = 'recording'
  }

  this.stop = function () {
    console.log('Recorder', 'Stopping..')
    this.isRecording = false
    pilot.mixer.recorder.stop()
    pilot.el.className = ''
  }

  this.toggle = function () {
    if (this.isRecording !== true) {
      this.start()
    } else {
      this.stop()
    }
  }

  this.save = function (blob) {
  }

  this.write = function (path, blob) {
  }
}

module.exports = Recorder
