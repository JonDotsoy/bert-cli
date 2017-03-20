/*
  Load detect the env configs
 */
exports = module.exports = infoEnv

/**
 * @param {String[]} args
 * @param {Object}   opts
 */
function infoEnv (args, opts) {
  console.log(opts.env)

  // for (let nameEnv in opts.env) {
  //   // const valueEnv = opts.env[nameEnv]

  //   // console.log(`${nameEnv}: ${valueEnv}`)
  // }
}
