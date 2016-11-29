/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import Play from '/imports/both/models/Play'
import loadGame from '/server/fixtures'

import { should } from 'meteor/practicalmeteor:chai'

should()
describe('Game', () => {
  afterEach((done) => {
    const collections = [Game, Player, Team, Snitch, Play]
    collections.forEach((collection) => {
      collection.remove({})
    })
    done()
  })
  describe('has ended', () => {
    it('returns true if its snitch has been caught', () => {
      loadGame()
      const game = Game.findOne()
      const seeker = Player.findOne({ role: 'seeker' })
      const { snitch } = game
      seeker.catch(snitch)
      const hasEnded = game.hasEnded
      hasEnded.should.be.true
    })
  })
  describe('winner', () => {
    it('returns the team with the highest score after the snitch was caught', () => {
      loadGame()
      const game = Game.findOne()
      const team = game.teams[0]
      const chaser = team.chasers[0]
      const seeker = team.seeker
      const { snitch } = game
      chaser.shoot()
      chaser.shoot()
      chaser.shoot()
      chaser.shoot()
      chaser.shoot()
      seeker.catch(snitch)
      const { winner } = game
      const winnerId = winner._id
      winnerId.should.equal(team._id)
    })
  })
})
