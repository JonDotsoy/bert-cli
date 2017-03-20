#! /usr/bin/env node
// require('./_bert.js')

const spawn = require('child_process').spawn
const path = require('path')

const args = [path.join(__dirname, '_bert.js'), ...process.argv.slice(2)]

const proc = spawn(process.execPath, args, { stdio: 'inherit' })

proc.on('exit', function (code, signal) {
  process.on('exit', function () {
    if (signal) {
      process.kill(process.pid, signal)
    } else {
      process.exit(code)
    }
  })
})

// terminate children.
process.on('SIGINT', function () {
  proc.kill('SIGINT')
  proc.kill('SIGTERM')
})
