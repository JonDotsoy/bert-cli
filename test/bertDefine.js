const {expect} = require('chai')

function interopRequireDefault (obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

describe('Bert Define (.bert.js)', function () {
  describe('bert file.', () => {
    it('require/import', () => {
      // ES5
      // const bert = require('bert')
      const r1 = require('..')

      // ES6
      // const {bert} = require('bert')
      const r2 = require('..').bert

      // ES7
      /* import bert from 'bert' */
      const r3 = interopRequireDefault(require('..')).default
      /* import {bert} from 'bert' */
      const r4 = interopRequireDefault(require('..')).bert

      expect(r1).to.be.eql(r2)
      expect(r1).to.be.eql(r3)
      expect(r1).to.be.eql(r4)
      expect(r2).to.be.eql(r3)
      expect(r2).to.be.eql(r4)
      expect(r3).to.be.eql(r4)
    })

    it('bert.task(<name: String>)', async () => {
      const bert = new (require('..').Bert)()

      const resultTaskFN = bert.task('MyTask')

      expect(resultTaskFN).to.be.eql(bert)
      expect(bert).have.a.property('tasks').be.a('object')
      expect(bert.tasks).have.a.property('MyTask').be.a('object')
      expect(bert.tasks.MyTask).have.a.property('name').to.eql('MyTask')
    })

    it('bert.task(<name: String>, <dep: String[]>)', () => {
      const bert = new (require('..').Bert)()

      bert.task('MyTask', ['dep1', 'dep2'])

      expect(bert.tasks).have.a.property('MyTask').to.be.an('object')
      expect(bert.tasks.MyTask.dep).to.be.an('array').length(2)
      expect(bert.tasks.MyTask.fn).to.be.a('function')
      expect(bert.tasks.MyTask.name).to.be.a('string')
      expect(bert.tasks.MyTask.dep).to.include('dep1')
      expect(bert.tasks.MyTask.dep).to.include('dep2')
    })

    it('bert.task(<name: String>, <dep: String[]>, <fn: Function>)', () => {
      const bert = new (require('..').Bert)()

      const a = () => {}
      const b = () => {}

      bert.task('MyTask', a)
      bert.task('MyTask2', ['MyTask'], b)

      expect(bert.tasks).have.a.property('MyTask').to.be.a('object')
      expect(bert.tasks.MyTask.fn).to.be.eql(a)
      expect(bert.tasks).have.a.property('MyTask2').to.be.a('object')
      expect(bert.tasks.MyTask2.fn).to.be.eql(b)
    })
  })
})
