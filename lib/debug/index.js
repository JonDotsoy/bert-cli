const debug = require('debug')

exports = module.exports = debugLib

function noop () {}

function debugLib ({
  verbose: isVerbose = false,
  log: isLog = true,
  error: isError = true,
  warn: isWarn = true
}) {
  debug.enable('bert:verbose,bert:log,bert:error,bert:warn')

  const deubgVerbose = debug('bert:verbose')
  const deubgLog = debug('bert:log')
  const deubgError = debug('bert:error')
  const deubgWarn = debug('bert:warn')

  function verbose (...args) { deubgVerbose(...args) }
  function log (...args) { deubgLog(...args) }
  function error (...args) { deubgError(...args) }
  function warn (...args) { deubgWarn(...args) }

  return {
    verbose: isVerbose ? verbose : noop,
    log: isLog ? log : noop,
    error: isError ? error : noop,
    warn: isWarn ? warn : noop
  }
}
