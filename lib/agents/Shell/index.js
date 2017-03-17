const stackTrace = require('stack-trace')
const spawn = require('child_process').spawn
const logger = require('../../logger')

class ShellAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)
  }

  async sh (args, opts = {}) {
    stackTrace.get().map(tr => {
      console.log(`${tr.getFileName()}:${tr.getLineNumber()}:${tr.getColumnNumber()}`)
    })

    const tr = stackTrace.get()[1]

    opts = Object.assign({}, this.defaultOpts || {}, opts || {})

    return new Promise((resolve, reject) => {
      const [command, ...commandArgs] = args

      console.log((this.logger ? this.logger : logger.shell)(args, this.name))

      const proc = spawn(command, commandArgs, { stdio: 'inherit' })

      proc.on('exit', (code, signal) => {

        if (code === 0) {
          resolve({code, signal})
        } else {
          const error = Object.assign(new Error(`Process close with ${code} code: ${tr.getFileName()}:${tr.getLineNumber()}:${tr.getColumnNumber()}`, tr.getFileName(), tr.getLineNumber()), {code, signal})

          reject(error)
        }
      })

    })
  }
}

exports = module.exports = ShellAgent
