const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const isString = require('lodash/isString')
const Agent = require('../Agent')
const Shell = require('../Shell')

class DockerAgent {
  constructor (opts) {
    Object.assign(this, opts)

    this.originalShell = new Shell()

    if (!this.loggererr) this.loggererr = data => (process.stderr.write(chalk.red(`[${moment().format('HH:mm:ss')}]: `)), process.stderr.write(data))
    if (!this.loggerout) this.loggerout = data => (process.stdout.write(chalk.grey(`[${moment().format('HH:mm:ss')}]: `)), process.stdout.write(data))

    this.preparing = null
  }

  async prepare () {
    if (this.preparing === null) {
      const prepareFn = async () => {
        // await this.docker('pull', this.image)

        const envsToCreate = Object.keys(process.env).map((e) => {
          return `-e ${e}='${process.env[e].replace(/([^\w])/ig, '\\$1')}'`
        })

        await this.dockerSilent('create', '-t', '--entrypoint', 'cat', ...envsToCreate, ...(this.nameContainer ? ['--name', this.nameContainer] : []), `"${this.image}"`)
        await this.docker('start', this.nameContainer)
      }

      this.preparing = prepareFn()

      return this.preparing
    }

    return this.preparing
  }

  async docker (...args) {
    return this.originalShell.sh(['docker', ...args].join(' '))
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
