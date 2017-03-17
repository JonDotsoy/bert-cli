'use strict'

const util = require('util')
const Orchestrator = require('orchestrator')
const ShellAgent = require('./lib/agents/Shell')

function Bert () {
  Orchestrator.call(this)
}
util.inherits(Bert, Orchestrator)

Bert.prototype.shell = new ShellAgent()
Bert.prototype.sh = function () { return this.shell.sh.apply(this.shell, arguments) }

Bert.prototype.task = Bert.prototype.add

// Let people use this class from our instance
Bert.prototype.Bert = Bert

var inst = new Bert()
module.exports = inst
