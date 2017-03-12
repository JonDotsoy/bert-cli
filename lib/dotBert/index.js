const memoize = require('lodash/memoize')
const resolve = require('resolve')
const path = require('path')
const glob = require('glob')
const fs = require('fs')

exports = module.exports = {
  setup
}

function setup ({silent = true, bertfile = '.bert.js', workdir:_workdir = null} = {}) {
  const cwd = process.cwd()
  const workdir = _workdir || findDeepDotBert(cwd, {bertfile})


  /* Load the bertfile on current project. */
  function load () {
    if (workdir === undefined) {
      throw new Error(`'${bertfile}' file is not found.`)
    }

    const fullpathbertfile = path.join(workdir, bertfile)

    try {
      const stat = fs.statSync( fullpathbertfile )
    } catch (ex) {
      throw ex
    }

    /* Load Bert Conf */
    const resolvebert = resolve.sync('bert.js', {basedir:workdir})

    const defbert = require(resolvebert)

    const isBertopts = rembert => (rembert instanceof defbert.Bert)

    global.bert = defbert
    const rembert = require(fullpathbertfile)
    const bert = isBertopts(rembert)
      ? rembert
      : isBertopts(defbert.bert)
        ? defbert.bert
        : defbert

    return bert
  }

  return {
    workdir,
    load: memoize(load)
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
