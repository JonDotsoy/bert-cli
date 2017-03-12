const path = require('path')
const fs = require('fs')

exports = module.exports = infoTask


function infoTask (args, opts) {
  const def = opts.bertConfig.load()

  console.log( def.tasks )
}


