const { ShellCommand } = require('./shell_command')
var { ServiceList } = require('./service_list')
class Service {
  constructor(name, state){
    this.name = name
    this.state = state
  }

  draw(root_element) {
    this.node = document.createElement("LI")
    this.node.setAttribute("data-state", this.state)

    var statusnode = document.createElement("SPAN")
    statusnode.setAttribute("class", 'status')

    var toggler = document.createElement("SPAN")
    toggler.setAttribute("class", 'toggler')

    statusnode.appendChild(toggler)
    this.node.appendChild(statusnode)

    var textnode = document.createTextNode(this.name)
    this.node.appendChild(textnode)
    root_element.appendChild(this.node)
    this.addListener()
  }

  setState(state) {
    this.node.setAttribute("data-state", state);
    this.state = state
  }

  addListener(callback) {
    this.node.addEventListener('click', () => {
      var old_state = this.state
      this.setState('waiting');
      var command = (old_state == "started") ? "stop"
                  : (old_state == "stopped") ? "start"
                  : null

      if (command) {
        ShellCommand.run("brew", ["services", command, this.name], (output) => {
          var match = output.match(/(started)|(stopped)/)
          if (match){
            var new_state = match[0]
            this.state = new_state
            this.setState(new_state)
          }
        })
      }
    })
  }
}

exports.Service = Service