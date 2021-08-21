const Command = require('./command')

module.exports = class ping extends Command {

  static match (message)
  {
    return message.content.startsWith('// ping')
  }

  static action (message)
  {
    message.channel.send('pong');
  }

}
