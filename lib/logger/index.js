const ms = require('ms')
const moment = require('moment')
const chalk = require('chalk')
exports = module.exports = logger

const getTimeTag = () => [
  chalk.white('['),
  chalk.grey(moment().format('HH:mm:ss')),
  chalk.white(']'),
].join('')

function logger (msg) {
  return [
    getTimeTag(),
    msg
  ].join(' ')
}

logger.shell = shell
logger.startTask = startTask
logger.stopTask = stopTask

function shell (args) {
  return logger([chalk.cyan( 'sh >' ), chalk.grey( args.join(' ') )].join(' '))
}

function startTask (taskname) {
  return logger([
    chalk.reset("Starting '"),
    chalk.cyan(taskname),
    chalk.reset("'..."),
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

