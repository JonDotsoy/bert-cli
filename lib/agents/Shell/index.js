const spawn = require('child_process').spawn
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
      const [command, ...commandArgs] = args

      console.log((this.logger ? this.logger : logger.shell)(args, this.name))

      const proc = spawn(command, commandArgs, { stdio: 'inherit' })

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
