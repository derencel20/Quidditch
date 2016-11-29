/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import Play from '/imports/both/models/Play'
import loadGame from '/server/fixtures'

describe('Player', () => {
  describe('Chaser', () => {
    afterEach((done) => {
      const collections = [Game, Player, Team, Snitch, Play]
      collections.forEach((collection) => {
        collection.remove({})
      })
      done()
    })
    describe('score', () => {
      it('returns the score of the chaser', () => {
        loadGame()
        const chaser = Player.findOne({ role: 'chaser' })
        chaser.shoot()
        chaser.shoot()
        chaser.shoot()
        chaser.shoot()
        chaser.shoot()
        const { score } = chaser
        const scorePerGoal = 10
        score.should.equal(5 * scorePerGoal)
      })
    })
    describe('shoot', () => {
      it('increases the score of the chaser', () => {
        loadGame()
        const chaser = Player.findOne({ role: 'chaser' })
        chaser.shoot()
        const initialScore = chaser.score
        chaser.shoot()
        chaser.shoot()
        chaser.shoot()
        chaser.shoot()
        const finalScore = chaser.score
        const scorePerGoal = 10
        finalScore.should.equal(initialScore + (4 * scorePerGoal))
      })
    })
    describe('miss', () => {
      it('decreases the accuracy of the chaser', () => {
        loadGame()
        const chaser = Player.findOne({ role: 'chaser' })
        chaser.shoot()
        chaser.shoot()
        chaser.miss()
        const { accuracy } = chaser
        accuracy.should.be.closeTo(66.6, 0.09)
      })
    })
    describe('shoot attempts', () => {
      it('increases when a chaser makes actions', () => {
        loadGame()
        const chaser = Player.findOne({ role: 'chaser' })
        chaser.shoot()
        chaser.miss()
        const { shootAttempts } = chaser
        shootAttempts.should.equal(2)
      })
    })
  })
  describe('Keeper', () => {
    afterEach((done) => {
      const collections = [Game, Player, Team, Snitch, Play]
      collections.forEach((collection) => {
        collection.remove({})
      })
      done()
    })
    describe('block', () => {
      it('increases the block count of keeper', () => {
        loadGame()
        const keeper = Player.findOne({ role: 'keeper' })
        const chaser = Player.findOne({ role: 'chaser' })
        keeper.block(chaser)
        keeper.block(chaser)
        keeper.block(chaser)
        keeper.block(chaser)
        const { blocks } = keeper
        blocks.should.equal(4)
      })
    })
  })
  describe('Seeker', () => {
    afterEach((done) => {
      const collections = [Game, Player, Team, Snitch, Play]
      collections.forEach((collection) => {
        collection.remove({})
      })
      done()
    })
    describe('catch', () => {
      it('increases the points attained by the seeker if catches the snitch', () => {
        loadGame()
        const game = Game.findOne()
        const seeker = Player.findOne({ role: 'seeker' })
        const { snitch } = game
        seeker.catch(snitch)
        const { snitchPoints } = seeker
        snitchPoints.should.equal(30)
      })
      it('ends the game', () => {
        loadGame()
        const game = Game.findOne()
        const seeker = Player.findOne({ role: 'seeker' })
        const { snitch } = game
        seeker.catch(snitch)
        const { hasEnded } = game
        hasEnded.should.be.true
      })
    })
  })
})
