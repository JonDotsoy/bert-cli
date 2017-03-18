const stackTrace = require('stack-trace')
const spawn = require('child_process').spawn
const logger = require('../../logger')

class ShellAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)
  }

  async sh (args, opts = {}, tr) {
    opts = Object.assign({}, this.defaultOpts || {}, opts || {})
    const spawnOpts = Object.assign({}, opts, { stdio: [ process.stdin, 'pipe', 'pipe' ] })

    let stdoutcollection = []
    let stderrcollection = []

    return new Promise((resolve, reject) => {
      const [command, ...commandArgs] = args

      if (!spawnOpts.silent) {
        console.log((this.logger ? this.logger : logger.shell)(args, this.name))
      }

      const proc = spawn(command, commandArgs, spawnOpts)

      function killProc () {
        proc.kill('SIGINT')
        proc.kill('SIGTERM')
      }

      // terminate children.
      process.on('SIGINT', killProc)

      if (!spawnOpts.silent) {
        proc.stdout.on('data', function (data) {
          stdoutcollection.push.call(stdoutcollection, data)
          process.stdout.write.call(process.stdout, data)
        })

        proc.stderr.on('data', function (data) {
          stderrcollection.push.call(stdoutcollection, data)
          process.stderr.write.call(process.stderr, data)
        })
      }

      proc.on('exit', (code, signal) => {
        let result = {
          code,
          signal,
          stdout: stdoutcollection,
          stderr: stderrcollection
        }

        process.removeListener('SIGINT', killProc)

        if (code === 0) {
          resolve(result)
        } else {
          const error = Object.assign(new Error(`Process close with ${code} code.`), result)

          reject(error)
        }
      })
    })
  }
}

exports = module.exports = ShellAgent
