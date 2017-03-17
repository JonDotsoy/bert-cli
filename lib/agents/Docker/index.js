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

  async docker (args) {
    return this.localShell.sh(['docker', ...args])
  }

  async sh (cmd, opts, cb) {
    await this.prepare()

    return this.docker(['help'])
  }
}

exports = module.exports = DockerAgent
