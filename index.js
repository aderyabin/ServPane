const { remote } = require('electron');
const { ipcRenderer } = require('electron');
const { ServiceList } = require('./service_list');

const window = remote.getCurrentWindow();

function resizeWindow () {
  let height = 12;
  height += document.getElementById('events').clientHeight;
  height += document.getElementById('service-list').clientHeight;
  const width = document.getElementById('events').clientWidth;
  window.setSize(width, height);
}

ipcRenderer.on('vibrancy', (_, vibrancy) => {
  document.body.className = vibrancy;
});

document.addEventListener('DOMContentLoaded', () => {
  const serviceListElement = document.getElementById('service-list');
  const serviceList = new ServiceList(serviceListElement);

  serviceList.load();
  resizeWindow();

  document.getElementById('quit').addEventListener('click', () => {
    remote.app.quit();
  });

  window.on('show', () => {
    serviceList.load();
    resizeWindow();
  });
});
