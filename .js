const stackTrace = require('stack-trace')


function a () { b() }
function b () {
  stackTrace.get().map(e=>{
    console.log(e.getFileName())
  })
}


console.log(a())