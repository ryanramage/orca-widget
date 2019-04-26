const Terminal = require('./orca/sources/scripts/terminal')
const terminal = new Terminal()
const Pilot = require('./pilot/sources/scripts/pilot')
const pilot = new Pilot()

window.onload = function () {

  terminal.install(document.getElementById('orcaShell'))
  terminal.start()

  pilot.install(document.getElementById('pilotShell'))
  pilot.start()

  function open (url) {
    window.fetch(url).then(resp => resp.text()).then(text => {
      const lines = text.split('\n')
      const w = lines[0].length
      const h = lines.length
      const s = lines.join('\n').trim()
      let o = terminal.orca.load(w, h, s)
      terminal.load(o)
    })
  }

  let load = document.getElementById('loadButton')
  load.onclick = function () {
    let url = window.prompt('enter orca url')
    if (!url || !url.length) return
    open(url)
  }
  // check the hash
  let url = window.location.hash
  if (!url.length) return
  url = decodeURIComponent(url.substring(1))
  open(url)

}
