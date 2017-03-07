exports = module.exports = info


function info (args, opts) {
  switch (args.shift()){
    case 'env':
      require('./env').call(this, args, opts)
  }
}