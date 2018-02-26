
const { spawn } = require('child_process');

class ShellCommand {
  static run (cmd, options = [], callback) {
    const command = spawn(cmd, options);
    let result;
    command.stdout.on('data', (data) => {
      result = data.toString();
    });
    command.on('close', code => callback(result));
  }
}

exports.ShellCommand = ShellCommand;
