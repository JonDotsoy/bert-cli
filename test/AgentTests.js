const expect = require('chai').expect

describe('Agents', function () {
  describe('ShellAgent', function () {
    it('Create', () => {
      const ShellAgent = require('../lib/agents/Shell')

      const shell = new ShellAgent()
    })

    it('format cmd by string', () => {
      const ShellAgent = require('../lib/agents/Shell')

      const inlinecmd = ShellAgent.format('"echo" "hola"')

      expect(inlinecmd).to.be.eql('"echo" "hola"')
    })

    it('format cmd', () => {
      const ShellAgent = require('../lib/agents/Shell')

      const inlinecmd = ShellAgent.format(['echo', 'hola'])

      expect(inlinecmd).to.be.eql('"echo" "hola"')
    })

    it.only('run script', async () => {
      const ShellAgent = require('../lib/agents/Shell')

      let write

      const sh = new ShellAgent('echo hola', {
        logger: (e) => (write = e)
      })

      const result = await sh.run()

      expect(result).to.be.eql(0)
      expect(write).to.include('hola')
    })

  })

  describe('DockerAgent', function () {
    it('Create', () => {
      const DockerAgent = require('../lib/agents/Docker')

      const docker = new DockerAgent()
    })

    it('.format(): Example 1', () => {
      const DockerAgent = require('../lib/agents/Docker')

      const inlinecmd = DockerAgent.format({
        action: 'create',
        name: 'example',
        image: 'node:7.7.0',
        env: {
          'aaa': 'aaa',
          'bbb': 'bbb',
          'ccc': 'ccc',
        }
      })

      expect(inlinecmd).to.be.eql('docker create -t --name "example" -e "aaa=aaa" -e "bbb=bbb" -e "ccc=ccc" --entrypoint "cat" "node:7.7.0"')
    })

    it('.format(): Example 2', () => {
      const DockerAgent = require('../lib/agents/Docker')

      const inlinecmd = DockerAgent.format({
        action: 'create',
        name: 'example',
        image: 'node',
      })

      expect(inlinecmd).to.be.eql('docker create -t --name "example" --entrypoint "cat" "node"')
    })

  })
})
