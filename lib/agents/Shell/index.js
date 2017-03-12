const minimist = require('minimist')
const isString = require('lodash/isString')
const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const trim = require('lodash/trim')
const Agent = require('../Agent')
const exec = require('child_process').exec

class ShellAgent extends Agent {
  constructor (_ = [], opts = {}) {
    super(_, opts)

    this.logger = opts.logger || ((e) => {process.stdout.write(e)})
  }

  async run () {
    return new Promise((resolve, reject) => {
      const cp = exec(ShellAgent.format(this._))

      cp.stdout.on('data', this.logger)
      cp.stderr.on('data', this.logger)

      cp.on('exit', resolve)
    })
  }

  static format (opts) {
    if (isString(opts)) return opts
    if (isArray(opts)) {
      return opts
        .map(e => (
          `"${trim(e,`"'`).replace(/(")/,'\\$1')}"`
        ))
        .join(' ')
    }
  }

}

exports = module.exports = ShellAgent

