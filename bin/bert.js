#! /usr/bin/env node
const path = require('path')
const {jsonToENV} = require('../lib/jsonToENV')

const argv = require('minimist')(process.argv.slice(3), {
  boolean: [
    'help'
  ],
  alias: {
    help: 'h'
  }
})

function setup (argv) {
  jsonToENV('npm_package' , path.join(__dirname, '../package.json'))

  const args = [...argv._]

  const help = () => require('../lib/help').call(null, args, argv)

  if (argv.help) {
    return help()
  }

  switch (args.shift()) {
    case 'help':
    default:
      return help()
  }
}

setup(argv)
