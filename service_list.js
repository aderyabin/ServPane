const { Service } = require('./service')
const { ShellCommand } = require('./shell_command')

class ServiceList {
  constructor(root_element) {
    this.root_element = root_element
  }

  clear() {
    this.root_element.innerHTML = ""
  }

  load() {
    ShellCommand.run("brew", ["services", "list"], (output) => {
      var lines = output.toString().split("\n");
      lines.shift();
      lines.pop();
      this.clear();
      lines.forEach((line) => {
        var parts = line.split(/\s+/)
        var service = new Service(parts[0], parts[1])
        service.draw(this.root_element)
      })
    })
  }
}

exports.ServiceList = ServiceList