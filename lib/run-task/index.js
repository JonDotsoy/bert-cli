exports = module.exports = runTask

function runTask (args, opts) {
  /* Definition to bert */
  const defbert = opts.bertConfig.load()

  /* depatch errors */
  args.forEach(taskName => {
    if (!(taskName in defbert.tasks)) throw new Error(`'${taskName}' task is not found.`)
  })
  
  args.forEach(taskName => {
    defbert.tasks[taskName].start()
  })

}


