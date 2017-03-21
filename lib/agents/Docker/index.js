const os = require('os')
const toLower = require('lodash/toLower')
const logger = require('../../logger')
const Shell = require('../Shell')
const path = require('path')
const dotenv = require('./lib/dotenv')

// erros
const thNotTEMPenv = function () { throw new Error("Is not found the enviroment 'TMP' or 'TEMP' variables.") }

const vartmpdir = process.env.TMP || process.env.TEMP || thNotTEMPenv()

class DockerAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)

    this.workdir = this.workdir || process.cwd()
    this.workdirDocker = this.workdirDocker || (() => {
      if (os.platform() === 'win32') {
        let workdirSplit = this.workdir.split(path.sep)

        workdirSplit[0] = toLower(workdirSplit[0].replace(/\W/, ''))

        return path.posix.join(path.posix.sep, workdirSplit.join(path.posix.sep))
      }

      return this.workdir
    })()

    this.localShell = new Shell({
      logger: logger.agent,
      name: this.name || 'agent'
    })

    this.hashContainer = null
    this.nameContainer = `bert-container-${this.localShell.name}`.replace(/[\W]/g, '_').substring(0, 30)

    this.tmpENVFile = path.join(vartmpdir, `./.env.bert.${this.nameContainer}.${process.pid}.tmp`)

    this.preparing = null
  }

  async rmContainer (opts, tr) {
    if (this.hashContainer) {
      await dotenv.removeEnvFile(this.tmpENVFile)
      await this.docker(['stop', this.hashContainer, '-t', '0'], opts, tr)
      await this.docker(['rm', '-f', this.hashContainer], opts, tr)
    }
  }

  async prepare (opts = {}, tr) {
    opts.silent = opts.silent || true

    if (this.preparing === null) {
      const prepareFn = async () => {
        await dotenv.writeEnvFile(dotenv.laodProcessEnvStr(), this.tmpENVFile)

        const result = await this.docker([
          'create',
          '-t',
          '-v', `${this.workdirDocker}:${this.workdirDocker}`,
          '--workdir', this.workdirDocker,
          '--env-file', this.tmpENVFile,
          '--entrypoint', 'cat',
          this.image
        ], opts, tr)

        this.hashContainer = result.stdout.map(data => data.toString().trim()).pop()

        await this.docker(['start', this.hashContainer], opts, tr)
      }

      this.preparing = prepareFn()

      return this.preparing
    }

    return this.preparing
  }

  async docker (args, opts = {}, tr) {
    return this.localShell.sh(['docker', ...args], opts, tr)
  }

  async exec (args, opts = {}, tr) {
    if (opts.originalShow !== true) {
      opts.argsShow = args
    }

    return this.docker(['exec', '-it', this.hashContainer, ...args], opts, tr)
  }

  async sh (args, opts, tr) {
    await this.prepare(opts, tr)

    return this.exec(args, opts, tr)
  }
}

exports = module.exports = DockerAgent
