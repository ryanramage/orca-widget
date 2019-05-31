const Terminal = require('./orca/sources/scripts/terminal').default
console.log(Terminal)
const terminal = new Terminal()

window.onload = function () {

  terminal.install(document.getElementById('orcaShell'))
  terminal.start()

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
