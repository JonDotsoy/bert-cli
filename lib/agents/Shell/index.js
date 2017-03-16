const minimist = require('minimist')
const chalk = require('chalk')
const moment = require('moment')
const isString = require('lodash/isString')
const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const trim = require('lodash/trim')
const Agent = require('../Agent')
const exec = require('child_process').exec

class ShellAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)

    if (!this.loggererr) this.loggererr = data => (process.stderr.write(chalk.red(`[${moment().format('HH:mm:ss')}]: `)), process.stderr.write(data))
    if (!this.loggerout) this.loggerout = data => (process.stdout.write(chalk.grey(`[${moment().format('HH:mm:ss')}]: `)), process.stdout.write(data))

    this.preparing = null
  }

  async prepare () {
    if (this.preparing === null) {
      this.preparing = Promise.resolve()

      return this.preparing
    }

    return this.preparing
  }

  async sh (cmd, opts = {}, cb) {
    await this.prepare()

    const {silent} = opts || {}

    let ps

    const p = await new Promise((resolve, reject) => {
      ps = exec(cmd, Object.assign({}, this.defaultOpts || {}, opts || {}), cb)

      if (!silent) {
        ps.stdout.on('data', this.loggerout)
        ps.stderr.on('data', this.loggererr)
      }

      ps.on('error', reject)

      ps.on('exit', codeClose => {
        if (codeClose !== 0) {
          return reject(codeClose)
        } else {
          return resolve(codeClose)
        }
      })
    })

    // cb && cb({child_process: ps})

    return p
  }
}

exports = module.exports = ShellAgent
