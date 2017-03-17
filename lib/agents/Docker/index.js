const logger = require('../../logger')
const Shell = require('../Shell')

class DockerAgent {
  constructor (opts) {
    Object.assign(this, opts)

    this.originalShell = new Shell({
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

  async docker (...args) {
    return this.originalShell.sh(['docker', ...args])
  }

  async dockerSilent (...args) {
    try {
      return await this.originalShell.sh(['docker', ...args].join(' '), {silent: !true})
    } catch (ex) {}
  }

  async sh (cmd, opts, cb) {
    await this.prepare()

    return this.docker('exec', this.nameContainer, `sh -c "${cmd}"`)
  }
}

exports = module.exports = DockerAgent
