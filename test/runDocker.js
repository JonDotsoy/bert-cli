const expect = require('chai').expect

describe('run Docker', function () {
  
  it('Make a docker agent', async () => {
    const bert = require('..')
    const DockerAgent = require('../lib/agents/Docker')

    const docker = new DockerAgent({
      nameContainer: 'node',
      image: 'node:7.7.0',
    })

    await docker.prepare()

    await bert.sh('node --version')
    await docker.sh('env')

  })

})