'use strict'

export default function Source (terminal) {

  this.path = null
  this.queue = []

  this.start = function () {
    this.increment()
    this.new()
  }

  this.new = function () {
    console.log('Source', 'Make a new file..')
    this.path = null
    this.queue = []
    terminal.orca.reset()
    terminal.resize()
    terminal.history.reset()
    terminal.cursor.reset()
    terminal.clock.play()
  }

  this.open = function () {
    console.log('Source', 'Open a file..')
  }

  this.save = function (quitAfter = false) {
    console.log('Source', 'Save a file..')
  }

  this.saveAs = function (quitAfter = false) {
    console.log('Source', 'Save a file as..')
  }

  this.revert = function () {
    if (!this.path) { return }
    console.log('Source', 'Revert a file..')
  }

  this.inject = function (name, paste = false) {
  }

  // I/O

  this.write = function (loc, data = this.generate(), quitAfter = false) {

  }

  this.run = function () {
    if (!this.queue || this.queue.length < terminal.orca.f || !this.queue[terminal.orca.f]) { return }
    terminal.commander.trigger(this.queue[terminal.orca.f])
  }

  this.load = function (data) {
    const lines = data.split('\n').map((line) => { return clean(line) })
    const w = lines[0].length
    const h = lines.length
    const s = lines.join('\n').trim()

    terminal.orca.load(w, h, s)
    terminal.history.reset()
    terminal.history.record(terminal.orca.s)
    terminal.fit()
  }

  this.quit = function () {
  }

  this.verify = function () {
  }

  this.hasChanges = function () {
  }

  // LocalStorage

  this.resume = function () {
    this.read(this.recall('active'))
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

  this.increment = function () {
    const val = this.recall('session')
    this.remember('session', isNaN(val) ? 1 : parseInt(val) + 1)
  }

  // Converters

  this.generate = function (orca = terminal.orca) {
    return `${orca}`
  }

  this.locate = function (name) {
    if (!this.path) { return }
    const loc = path.join(this.folder(), name)
    return fs.existsSync(loc) ? loc : null
  }

  // Etc

  this.name = function () {
    return this.path ? path.basename(this.path, '.orca') : null
  }

  this.folder = function () {
    return this.path ? path.dirname(this.path) : null
  }

  this.toString = function () {
    return this.path ? this.name() : 'unsaved'
  }

  function isDifferent (a, b) {
    return a.replace(/[^a-zA-Z0-9+]+/gi, '').trim() !== b.replace(/[^a-zA-Z0-9+]+/gi, '').trim()
  }

  function clean (s) {
    let c = ''
    for (let x = 0; x <= s.length; x++) {
      const char = s.charAt(x)
      c += !terminal.orca.isAllowed(char) ? '.' : char
    }
    return c
  }
}
