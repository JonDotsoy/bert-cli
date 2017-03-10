const path = require('path')
const glob = require('glob')

exports = module.exports = {
  setup
}

function setup ({silent = true, bertfile = '.bert.js', workdir = null} = {}) {
  const cwd = process.cwd()
  const workdir = workdir || findDeepDotBert(cwd, {bertfile})

  return {
    workdir,
    load
  }

  function load () {
    
  }
}

/**
 * Find the dotBert on folders.
 */
function findDeepDotBert (cwdArg, {bertfile = '.bert.js'} = {}) {
  return [cwdArg, ...allDirname(cwdArg)].find((pathName) => {
    return glob.sync(bertfile, {cwd: pathName}).length !== 0
  })
}

function allDirname (startCwd) {
  const dirname = path.dirname(startCwd)

  if (dirname !== startCwd) {
    return [].concat(dirname, allDirname(dirname))
  } else {
    return []
  }
}
