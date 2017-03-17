#! /usr/bin/env node
require('./_bert.js')

// const spawn = require('child_process').spawn
// const path = require('path')

// const args = [path.join(__dirname, '_bert.js'), ...process.argv.slice(2)]

// const proc = spawn(process.execPath, args, { stdio: 'inherit' })

// proc.on('exit', function (code, signal) {
//   process.on('exit', function () {
//     if (signal) {
//       process.kill(process.pid, signal)
//     } else {
//       process.exit(code)
//     }
//   })
// })

// // terminate children.
// process.on('SIGINT', function () {
//   proc.kill('SIGINT')
//   proc.kill('SIGTERM')
// })

// // #! /usr/bin/env node
// // const path = require('path')
// // const {jsonToENV} = require('../lib/jsonToENV')
// // const dotEnv = require('dotenv')
// // const dotBert = require('../lib/dotBert')
// // const debugLib = require('../lib/debug')

// // const argv = require('minimist')(process.argv.slice(2), {
// //   boolean: [
// //     'help',
// //     'verbose',
// //     'skip-env'
// //   ],
// //   alias: {
// //     help: 'h',
// //     env: 'e',
// //     verbose: 'V',
// //   },
// //   default: {
// //     env: [],
// //     verbose: false,
// //     workdir: null,
// //     'skip-dotenv': false,
// //     'skip-env': false,
// //     'bertfile': '.bert.js'
// //   }
// // })

// // if (argv['skip-env'] !== false) {
// //   process.env = {}
// // }

// // if (argv['skip-dotenv'] === false) {
// //   dotEnv.config({silent: true})
// // }

// // /* Parse Opts ENV */
// // const argvEnv = [].concat(
// //   process.env,
// //   [].concat(argv.env)
// //     .map( (e) => dotEnv.parse(e) )
// // ).reduce((c, n) => {
// //   return Object.assign(c, n)
// // })

// // argv.env = argvEnv
// // argv.bertConfig = dotBert.setup({silent: true, bertfile: argv.bertfile, workdir: argv.workdir})

// // argv.debug = debugLib({verbose: argv.verbose})

// // if (argv.bertConfig.workdir) {
// //   argv.debug.verbose('Change workdir to "%s"', argv.bertConfig.workdir)
// //   process.chdir(argv.bertConfig.workdir)
// // }

// // /**
// //  * This is a setup function.
// //  *
// //  * @param {object}   argv   - The arguments by line command. Rreference of minimist
// //  * @param {String[]} argv._
// //  */
// // async function setup (argv) {
// //   // clone the argv parameter
// //   const args = [...argv._]

// //   const help = () => require('../lib/help').call(this, args, argv)

// //   let arg = args.shift()

// //   switch ( arg ) {
// //     case 'i':
// //     case 'info':
// //       return require('../lib/info').call(this, args, argv)

// //     case undefined:
// //     case 'help':
// //       return help()

// //     case 'run-task':
// //     case 'run':
// //       return require('../lib/run-task').call(this, args, argv)

// //     default:
// //       return require('../lib/run-task').call(this, [arg, ...args], argv)
// //   }
// // }

// // setup(argv)
// //   .catch(err => {
// //     console.error(err)
// //   })

