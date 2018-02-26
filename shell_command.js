class ShellCommand {
  static run(cmd, options = [], callback) {
    var spawn = require('child_process').spawn
    var command = spawn(cmd, options)
    var result = ''
    command.stdout.on('data', (data) => {
      result += data.toString()
    })
    command.on('close', (code) => {
      return callback(result)
    })
  }
}

exports.ShellCommand = ShellCommand