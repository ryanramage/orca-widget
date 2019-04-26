'use strict'

function Source (terminal) {

  this.path = null

  this.start = function () {
    this.new()
  }

  this.new = function () {
    console.log('Source', 'Make a new file..')
    this.path = null
    terminal.orca.reset()
    terminal.resize()
    terminal.history.reset()
    terminal.clock.play()
  }

  this.open = function () {
    console.log('Source', 'Open a file..')
  }

  this.save = function (as = false) {
    console.log('Source', 'Save a file..')
  }
  this.saveAs = function () {
    console.log('Source', 'Save a file as..')
  }

  this.revert = function () {
    if (!this.path) { return }
    console.log('Source', 'Revert a file..')
  }

  // I/O

  this.write = function (path, data = this.generate()) {
    console.log('Source', 'Writing ' + path)
  }

  this.read = function (path) {
    if (!path) { return }
    console.log('Source', 'Reading ' + path)
  }

  // LocalStorage

  this.resume = function () {
    const path = this.recall('active')
    if (path) {
      this.read(path)
    }
  }

  this.remember = function (key, val) {
    if (!key || !val) { return }
    console.log('Source', `Remember: ${key}=${val}`)
    localStorage.setItem(key, val)
  }

  this.recall = function (key) {
    if (!key) { return }
    if (localStorage.hasOwnProperty(key)) {
      console.log('Source', `Recall: ${key}`)
      return localStorage.getItem(key)
    }
  }

  this.forget = function (key) {
    if (!key) { return }
    console.log('Source', `Forget: ${key}`)
    localStorage.removeItem(key)
  }

  // Converters

  this.generate = function (orca = terminal.orca) {
    return `${orca}`
  }

  this.parse = function (text) {
    const lines = text.split('\n')
    const w = lines[0].length
    const h = lines.length
    const s = lines.join('\n').trim()
    return terminal.orca.load(w, h, s)
  }

  // Etc

  this.name = function (path = this.path) {
    const parts = this.path.replace(/\\/g, '/').split('/')
    return parts[parts.length - 1].replace('.orca', '').trim()
  }

  this.toString = function () {
    return this.path ? this.name() : 'blank'
  }
}

module.exports = Source
