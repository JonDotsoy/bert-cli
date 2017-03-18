const logger = require('../../logger')
const Shell = require('../Shell')

class DockerAgent {
  constructor (opts) {
    Object.assign(this, opts)

    this.localShell = new Shell({
      logger: logger.agent,
      name: this.name || 'agent'
    })

    this.nameContainer = `bert-container-${this.localShell.name}`.replace(/[\W]/g,'_').substring(0,30)

    this.preparing = null
  }

  async prepare (opts, tr) {
    if (this.preparing === null) {
      const prepareFn = async () => {
        const result = await this.docker(['create', '-t', '--entrypoint', 'cat', this.image], opts, tr)

        this.hashContainer = result.stdout.map( data => data.toString().trim() ).pop()

        await this.docker(['start', this.hashContainer])
      }

      this.preparing = prepareFn()

      return this.preparing
    }

    return this.preparing
  }

  async docker (args, opts, tr) {
    return this.localShell.sh(['docker', ...args], opts, tr)
  }

  async exec (args, opts, tr) {
    return this.docker(['exec', '-it', this.hashContainer, ...args], opts, tr)
  }

  async sh (args, opts, tr) {
    await this.prepare(opts, tr)

    return this.exec(args, opts, tr)
  }
}

exports = module.exports = DockerAgent
