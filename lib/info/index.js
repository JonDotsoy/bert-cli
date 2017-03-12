exports = module.exports = info


function info (args, opts) {
  switch (args.shift()){
    case 'env':
      return require('./env').call(this, args, opts)
    case 't':
    case 'task':
    case 'tasks':
      return require('./tasks').call(this, args, opts)
  }
}