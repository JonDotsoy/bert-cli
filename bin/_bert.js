#! /usr/bin/env node

const path = require('path')
const argv = require('minimist')(process.argv.slice(2), {
  default: {
    bertfile: '.bert.js'
  }
})
const localBert = require('..')
const logger = require('../lib/logger')

localBert.on('task_start', function ({task}) {
  console.log(logger.startTask(task))
})

localBert.on('task_stop', function ({task, duration}) {
  console.log(logger.stopTask(task, duration))
})

localBert.on('task_err', function ({task, message, err}) {
  console.log(logger.errTask(task, message, err.stack))
  process.exit(1)
})

const bertfile = path.join(process.cwd(), argv.bertfile)

async function run () {
  /* Load task bert */
  require(bertfile)

  localBert.start('default')
}

run()

