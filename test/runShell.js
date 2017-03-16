const expect = require('chai').expect

describe('Run Shell', function () {

  it('Make a Agent', async () => {
    const ShellAgent = require('../lib/agents/Shell')

    const shell = new ShellAgent()

    const codeExit = await shell.sh(`echo ok`)

    expect( codeExit ).to.be.eql( 0 )

  })

  it('Load shell', async () => {
    const bert = require('..')

    let out
    const codeExit = await bert.sh('echo ok', null, (err, stdout, stderr) => {
      out = stdout
    })

    expect( out ).to.include('ok')
    expect( codeExit ).to.be.eql( 0 )
  })

})

