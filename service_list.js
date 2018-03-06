const { Service } = require('./service');
const { ShellCommand } = require('./shell_command');

class ServiceList {
  constructor (rootElement) {
    this.rootElement = rootElement;
  }

  clear () {
    this.rootElement.innerHTML = '';
  }

  load () {
    ShellCommand.run('brew', ['services', 'list'], (output) => {
      const lines = output.toString().split('\n');
      lines.shift();
      lines.pop();
      this.clear();
      if (lines.length > 0) {
        lines.forEach((line) => {
          const parts = line.split(/\s+/);
          const service = new Service(parts[0], parts[1]);
          service.draw(this.rootElement);
        });
      } else {
        const tip = document.createElement('LI');
        const tipText = document.createTextNode('No available service');
        tip.appendChild(tipText);
        this.rootElement.appendChild(tip);
      }
    });
  }
}

exports.ServiceList = ServiceList;
