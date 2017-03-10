#! /usr/bin/env node
const path = require('path')
const {jsonToENV} = require('../lib/jsonToENV')
const dotEnv = require('dotenv')
const dotBert = require('../lib/dotBert')

const argv = require('minimist')(process.argv.slice(2), {
  boolean: [
    'help',
    'skip-env'
  ],
  alias: {
    help: 'h',
    env: 'e'
  },
  default: {
    env: [],
    workdir: null,
    'skip-dotenv': false,
    'skip-env': false,
    'bertfile': '.bert.js'
  }
})

if (argv['skip-env'] !== false) {
  process.env = {}
}

if (argv['skip-dotenv'] === false) {
  dotEnv.config({silent: true})
}

/* Parse Opts ENV */
const argvEnv = [].concat(
  process.env,
  [].concat(argv.env)
    .map( (e) => dotEnv.parse(e) )
).reduce((c, n) => {
  return Object.assign(c, n)
})

argv.env = argvEnv
argv.bertConfig = dotBert.setup({silent: true, bertfile: argv.bertfile, workdir: argv.workdir})

console.log(argv.bertConfig)

function setup (argv) {
  const args = [...argv._]

  const help = () => require('../lib/help').call(this, args, argv)

  let arg = args.shift()

  switch (arg) {
    case 't':
      return null

    case 'i':
    case 'info':
      return require('../lib/info').call(this, args, argv)

    case undefined:
    case 'help':
      return help()

    case 'run-task':
    case 'run':
      return require('../lib/run-task').call(this, args, argv)

    default:
      return require('../lib/run-task').call(this, [arg, ...args], argv)
  }
}

setup(argv)
