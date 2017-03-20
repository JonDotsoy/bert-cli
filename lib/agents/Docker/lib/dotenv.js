const fs = require('fs')

// make a env files
const toEnvStr = (str) => (str)

function makeEnvLineFromEnv (NAME, envs = process.env) {
  const VALUE = envs[NAME]
  return `${toEnvStr(NAME)}=${toEnvStr(VALUE)}`
}

const laodProcessEnvStr = () => Object
  .keys(process.env)
  .reduce(function (currentResult, currentKeyEnv) {
    if (!Array.isArray(currentResult)) {
      /* INIT */
      return [
        makeEnvLineFromEnv(currentResult),
        makeEnvLineFromEnv(currentKeyEnv)
      ]
    }

    currentResult.push(makeEnvLineFromEnv(currentKeyEnv))

    return currentResult
  })
  .join('\n')

const writeEnvFile = (str, file) => {
  fs.writeFileSync(file, str)
}

const removeEnvFile = (file) => {
  fs.unlinkSync(file)
}

exports = module.exports = {
  laodProcessEnvStr,
  writeEnvFile,
  removeEnvFile
}
