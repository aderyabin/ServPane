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
      lines.forEach((line) => {
        const parts = line.split(/\s+/);
        const service = new Service(parts[0], parts[1]);
        service.draw(this.rootElement);
      });
    });
  }
}

exports.ServiceList = ServiceList;
