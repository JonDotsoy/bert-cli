
function jsonToENV (prefix, pathfile) {

  function map (obj) {

    for (let i in obj) {
      console.log(i)
    }

  }

  return map(require(pathfile), prefix)
}

exports = module.exports = {
  jsonToENV
}

