const mocha = require('mocha')

describe('Agents', function () {
  describe('ShellAgent', function () {
    it('Create', () => {
      const ShellAgent = require('../lib/agents/Shell')

      const shell = new ShellAgent()
    })
  })

  describe('DockerAgent', function () {
    it('Create', () => {
      const DockerAgent = require('../lib/agents/Docker')

      const docker = new DockerAgent()
    })
  })
})
