const logger = require('../../logger')
const Shell = require('../Shell')

class DockerAgent {
  constructor (opts) {
    Object.assign(this, opts)

    this.localShell = new Shell({
      logger: logger.agent,
      name: this.name || 'agent'
    })

    this.preparing = null
  }

  async prepare () {
    if (this.preparing === null) {
      const prepareFn = async () => {
      }

      this.preparing = prepareFn()

      return this.preparing
    }

    return this.preparing
  }

  async docker (args, opts, tr) {
    return this.localShell.sh(['docker', ...args], opts, tr)
  }

  async sh (cmd, opts, tr) {
    await this.prepare()

    return this.docker(['help'], opts, tr)
  }
}

exports = module.exports = DockerAgent
