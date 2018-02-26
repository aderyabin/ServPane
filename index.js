const remote = require('electron').remote;
var ipc = require('electron').ipcRenderer;
var { ServiceList } = require('./service_list')

let window = remote.getCurrentWindow()


function resizeWindow() {
  var height = 12;
  height += document.getElementById('events').clientHeight
  height += document.getElementById('service-list').clientHeight
  var width = document.getElementById("events").clientWidth
  window.setSize(width, height)
}

ipc.on('vibrancy', (_, vibrancy) => {
  document.body.className = vibrancy
})

document.addEventListener("DOMContentLoaded", () => {
  var serviceListElement = document.getElementById('service-list')
  var serviceList = new ServiceList(serviceListElement)

  serviceList.load()
  resizeWindow()

  document.getElementById("quit").addEventListener("click", () => {
    remote.app.quit()
  })

  window.on('show', () => {
    serviceList.load()
    resizeWindow()
  })
})