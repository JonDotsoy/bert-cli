#! /usr/bin/env node
const path = require('path')
const chalk = require('chalk')
const resolve = require('resolve')
const logger = require('../lib/logger')
const every = require('lodash/every')

const argv = require('minimist')(process.argv.slice(2), {
  default: {
    bertfile: '.bert.js'
  }
})

/* Load instance to bert */
const localBertPath = process.env.BERT_MODE_DEV
  ? '..'
  : (() => {
    try {
      return resolve.sync('bert.js', { basedir: process.cwd() })
    } catch (ex) {
      console.error(chalk.red('ERROR: ') + chalk.reset(ex.message))
      process.exit(1)
    }
  })()

const localBert = require(localBertPath)

const getTasksToLoad = () => argv._.length === 0 ? ['default'] : argv._

let countRunClears = 0

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

localBert.task('clear containers', async () => {
  countRunClears += 1

  const taskLoaded = getTasksToLoad()
  const doneTasks = taskLoaded.map(task => localBert.tasks[task].done)

  console.log(localBert)

  console.log(doneTasks)

  if (every(getTasksToLoad().map(task => localBert.tasks[task].done), Boolean)) {
    await Promise.all(Object.keys(localBert.agents).map(agent => localBert.agents[agent].rmContainer({silent: !true})))
  }
})

global.bert = localBert
const bertfile = path.join(process.cwd(), argv.bertfile)

async function run () {
  /* Load task bert */
  require(bertfile)

  const tasksToLoad = getTasksToLoad()
  const serieTasks = []

  tasksToLoad.forEach(taskName => {
    if (taskName in localBert.tasks) {
      const task = localBert.tasks[taskName]
      const isSerie = task.dep[localBert.Bert.prototype.toSerieTag] === true

      if (isSerie) {
          serieTasks.push.apply(serieTasks, task.dep)
      } else {
          serieTasks.push(taskName)
      }
    } else {
      throw new Error(`"${taskName}" Tasks is not found.`)
    }
  })

  for (let i = 0; i < serieTasks.length; i+=1) {
    const taskName = serieTasks[i]

    await new Promise(resolve => localBert.start(taskName, resolve))
  }
}

run()
.catch(err => console.error(err.stack))
