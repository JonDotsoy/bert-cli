const logger = require('../../logger')
const ShellAgent = require('../Shell')

class SSHAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)
    this.shell = new ShellAgent({
      logger: logger.agent,
      name: this.name || 'agent'
    })
  }

  async prepare () {

  }

  async ssh (args, opts = {}) {
    opts.argsShow = args

    return await this.shell.sh(['ssh', this.hostname, ...args], opts)
  }

  async sh (args, opts = {}) {
    return await this.ssh(args, opts)
  }
}

exports = module.exports = SSHAgent
