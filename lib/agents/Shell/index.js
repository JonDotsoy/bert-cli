const spawn = require('child_process').spawn
const logger = require('../../logger')

class ShellAgent {
  constructor (opts = {}) {
    Object.assign(this, opts)
  }

  // TODO: Validate the 'args' argument
  async sh (args, opts = {}, tr) {

    const argsToLog = opts.argsShow || args

    opts = Object.assign({}, this.defaultOpts || {}, opts || {})

    const spawnOpts = Object.assign(
      {},
      opts,
      { stdio: [ 'inherit', 'pipe', 'pipe' ] }
    )

    // TODO: By default should be hidden console log
    // const silent

    /* Array store */
    let stdallcollection = []
    let stdoutcollection = []
    let stderrcollection = []

    return new Promise((resolve, reject) => {
      const [command, ...commandArgs] = args
      let lineLogCMD = args.join(' ')

      if (!spawnOpts.silent) {
        console.log((this.logger ? this.logger : logger.shell)(argsToLog, this.name))
      }

      const proc = spawn(command, commandArgs, spawnOpts)

      function killProc () {
        proc.kill('SIGINT')
        proc.kill('SIGTERM')
      }

      // terminate children.
      process.on('SIGINT', killProc)

      proc.stdout.on('data', function (data) {
        stdoutcollection.push(data)
        stdallcollection.push(data)

        if (!spawnOpts.silent) process.stdout.write(data)
      })

      proc.stderr.on('data', function (data) {
        stderrcollection.push(data)
        stdallcollection.push(data)

        if (!spawnOpts.silent) process.stderr.write(data)
      })

      proc.on('exit', (code, signal) => {
        let result = {
          code,
          signal,
          stdall: stdallcollection,
          stdout: stdoutcollection,
          stderr: stderrcollection
        }

        process.removeListener('SIGINT', killProc)

        if (code === 0) {
          resolve(result)
        } else {
          const error = Object.assign(new Error(`Process Error ${code}: ${lineLogCMD}\n${stderrcollection.join('\n')}`), result)

          reject(error)
        }
      })
    })
  }
}

exports = module.exports = ShellAgent
