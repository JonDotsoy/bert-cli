const path = require('path')
const fs = require('fs')

exports = module.exports = infoTask

function infoTask (args, opts) {
  const def = opts.bertConfig.load()

  const sAgents = Object.keys(def.agents)
    .map(e => ([def.agents[e]._.name, def.agents[e].constructor.name]))

  console.log(JSON.stringify({
    agents: [{}].concat(sAgents).reduce((toMerge, [agentName, gentType]) => Object.assign(toMerge, {[agentName]: gentType})),
    tasks: def.tasks
  }, null, 2))
}
