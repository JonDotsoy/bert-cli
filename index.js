const ShellAgent = require('./lib/agents/Shell')
const BertSymbol = require('bert-symbol')
const DockerAgent = require('./lib/agents/Docker')
const pkg = require('./package.json')

class Bert {
  constructor ({
    defaultAgent = ShellAgent,
    defaultAgentOpts = {},
    defaultSetAgent = DockerAgent
  } = {}) {
    // Tagger
    this[BertSymbol] = true

    this.agents = {}
    this.tasks = {}

    this.defaultAgent = this.agent('default', defaultAgentOpts, defaultAgent)
    this.defaultSetAgent = defaultSetAgent
  }

  /**
   * define an agent.
   * @param {String} name - Agent name.
   * @param {Object} opts - Options to agent.
   */
  agent (name, opts = null, typeAgent = this.defaultSetAgent) {
    if (!name) throw new Error('Agent requires a name')

    if (opts) {
      opts.name = name

      this.agents[name] = new (typeAgent)(opts)
    }

    return this.agents[name]
  }

  task (arg0, arg1, arg2) {
    const name = String(arg0)

    if (!name) throw new Error('Task requires a name')

    let dep
    let fn = () => {}

    if (Array.isArray(arg1)) {
      dep = arg1
      if (arg2) {
        fn = arg2
      }
    } else if (arg1) {
      fn = arg1
    }

    this.tasks[name] = {
      name,
      dep: [].concat(dep).filter(Boolean).map(String),
      fn
    }

    return this
  }

  async sh (cmd) {
  }
}

Object.defineProperty(Bert.prototype, 'Bert', { value: Bert })
Object.defineProperty(Bert, 'Bert', { value: Bert })
Object.defineProperty(Bert.prototype, 'version', { value: pkg.version })
Object.defineProperty(Bert, 'version', { value: pkg.version })

// default instance
const bert = new Bert()

exports = module.exports = Object.defineProperties(bert, {
  __esModule: { value: true },
  default: { value: bert },
  bert: { value: bert }
})

