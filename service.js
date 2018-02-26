const { ShellCommand } = require('./shell_command');

class Service {
  constructor (name, state) {
    this.name = name;
    this.state = state;
  }

  draw (rootElement) {
    this.node = document.createElement('LI');
    this.node.setAttribute('data-state', this.state);

    const statusnode = document.createElement('SPAN');
    statusnode.setAttribute('class', 'status');

    const toggler = document.createElement('SPAN');
    toggler.setAttribute('class', 'toggler');

    statusnode.appendChild(toggler);
    this.node.appendChild(statusnode);

    const textnode = document.createTextNode(this.name);
    this.node.appendChild(textnode);
    rootElement.appendChild(this.node);
    this.addListener();
  }

  setState (state) {
    this.node.setAttribute('data-state', state);
    this.state = state;
  }

  addListener (callback) {
    this.node.addEventListener('click', () => {
      const oldState = this.state;
      this.setState('waiting');

      let command;
      if (oldState === 'started') {
        command = 'stop';
      } else if (oldState === 'stopped') {
        command = 'start';
      } else {
        command = null;
      }

      if (command) {
        ShellCommand.run('brew', ['services', command, this.name], (output) => {
          const match = output.match(/(started)|(stopped)/);
          if (match) {
            const newState = match[0];
            this.state = newState;
            this.setState(newState);
          }
        });
      }
    });
  }
}

exports.Service = Service;
