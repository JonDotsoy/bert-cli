#! /usr/bin/env node
const path = require('path')
const {jsonToENV} = require('../lib/jsonToENV')
const dotEnv = require('dotenv')

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
    'skip-dotenv': false,
    'skip-env': false
  }
})

if (argv['skip-env'] !== false) {
  process.env = {}
}

if (argv['skip-dotenv'] !== false) {
  dotEnv.config({silent: true})
}

/* Parse Opts env */
const argvEnv = [].concat(process.env, argv.env.map((e) => dotEnv.parse(e)))
.reduce((c, n) => {
  return Object.assign(c, n)
})

argv.env = argvEnv

// process.env = []
// console.log( require('dotenv').config( { silent: true } ).parsed )

// console.log(argv)

function setup (argv) {
  // jsonToENV('npm_package' , path.join(__dirname, '../package.json'))

  const args = [...argv._]

  const help = () => require('../lib/help').call(this, args, argv)

  if (argv.help) {
    return help()
  }

  switch (args.shift()) {
    case 'i':
    case 'info':
      return require('../lib/info').call(this, args, argv)

    case 'help':
    default:
      return help()
  }
}

setup(argv)

