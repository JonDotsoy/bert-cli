const isArray = require('lodash/isArray')
const isObject = require('lodash/isObject')
const isString = require('lodash/isString')
const Agent = require('../Agent')

class DockerAgent extends Agent {

  static format (propsArg) {
    if (!('action' in propsArg)) throw new Error(`"action" property is not defined.`)
    if (!('name' in propsArg)) throw new Error(`"name" property is not defined.`)
    if (!('image' in propsArg)) throw new Error(`"image" property is not defined.`)

    const entryoint = propsArg.dockerEntryoint || 'docker'
    const propAction = propsArg.action
    const propEntryoint = propsArg.entryoint || 'cat'
    const isTTY = propsArg.tty !== true
    const propName = propsArg.name
    const propImage = propsArg.image

    const outEnv = (Object.keys(propsArg.env||{}).map(e => `-e "${e}=${propsArg.env[e].replace(/\"/g, '\\$1')}"`)).join(' ')

    return [
      entryoint,
      propAction,
      isTTY ? '-t' : null,
      `--name "${propName}"`,
      outEnv,
      `--entrypoint "${propEntryoint}"`,
      `"${propImage}"`,
    ]
    .filter(Boolean)
    .join(' ')
  }
}

exports = module.exports = DockerAgent
