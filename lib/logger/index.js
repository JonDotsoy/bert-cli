const ms = require('ms')
const moment = require('moment')
const chalk = require('chalk')

/* exports */
exports = module.exports = logger

const getTimeTag = () => [
  chalk.white('['),
  chalk.grey(moment().format('HH:mm:ss')),
  chalk.white(']')
].join('')

function logger (msg) {
  return [
    getTimeTag(),
    chalk.reset(msg)
  ].join(' ')
}

logger.shell = shell
logger.agent = agent
logger.task = startTask
logger.startTask = startTask
logger.stopTask = stopTask
logger.errTask = errTask
logger.task.start = startTask
logger.task.stop = stopTask
logger.task.error = errTask
logger.task.err = errTask

function shell (args) {
  return logger([chalk.cyan('sh >'), chalk.grey(args.join(' '))].join(' '))
}

function agent (args, name) {
  return logger([chalk.cyan(`${name} >`), chalk.grey(args.join(' '))].join(' '))
}

function startTask (taskname) {
  return logger([
    chalk.reset("Starting '"),
    chalk.cyan(taskname),
    chalk.reset("'...")
  ].join(''))
}

function errTask (taskname, message, err) {
  return logger([
    chalk.reset("Task '"),
    chalk.cyan(taskname),
    chalk.reset("' Error: "),
    chalk.red(message),
    '\n',
    err
  ].join(''))
}

function stopTask (taskname, tm) {
  return logger([
    chalk.reset("Finished '"),
    chalk.cyan(taskname),
    chalk.reset("' after "),
    chalk.magenta(ms(tm, {long: true}))
  ].join(''))
}
