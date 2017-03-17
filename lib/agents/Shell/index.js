const minimist = require('minimist')
const chalk = require('chalk')
const moment = require('moment')
const isString = require('lodash/isString')
const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const trim = require('lodash/trim')
const Agent = require('../Agent')
const spawn = require('child_process').spawn
const exec = require('child_process').exec
const logger = require('../../logger')

class ShellAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)

    this.preparing = null
  }

  async prepare () {
    if (this.preparing === null) {
      this.preparing = Promise.resolve()

      return this.preparing
    }

    return this.preparing
  }

  async sh (args, opts = {}) {
    await this.prepare()

    opts = Object.assign({}, this.defaultOpts || {}, opts || {})

    return new Promise((resolve, reject) => {
      const [program, ...moreArgs] = args

      console.log(logger.shell(args))

      const proc = spawn(program, moreArgs, { stdio: 'inherit' })

      proc.on('exit', (code, signal) => {
        if (code === 0) {
          resolve({code, signal})
        } else {
          const error = Object.assign(new Error(`Process close with ${code} code.`), {code, signal})

          reject(error)
        }
      })

    })
  }
}

exports = module.exports = ShellAgent
