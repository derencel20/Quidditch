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

describe('Snitch', () => {
  afterEach((done) => {
    const collections = [Game, Player, Team, Snitch, Play]
    collections.forEach((collection) => {
      collection.remove({})
    })
    done()
  })
  describe('duration', () => {
    it('returns the correct duration it lasted', () => {
      loadGame()
      const game = Game.findOne()
      const snitch = game.snitch

      Play.insert({
        type: 'snitch appeared',
        snitchId: snitch._id,
        date: new Date('2016-11-10T16:00'),
        gameId: game._id,
      })
      Play.insert({
        type: 'snitch caught',
        snitchId: snitch._id,
        date: new Date('2016-11-10T17:00'),
        gameId: game._id,
      })
      // duration is converted from milliSeconds to minutes
      const duration = snitch.duration / (1000 * 60)
      duration.should.equal(60)
    })
  })
  describe('appearance', () => {
    it('returns true if the snitch appears', () => {
      loadGame()
      const game = Game.findOne()
      const snitch = game.snitch
      snitch.appears()
      const hasAppeared = snitch.hasAppeared
      hasAppeared.should.be.true
    })
  })
  describe('captured', () => {
    it('returns true if the snitch was captured', () => {
      loadGame()
      const game = Game.findOne()
      const snitch = game.snitch
      const seeker = game.teams[0].seeker
      seeker.catch(snitch)
      const isCaught = snitch.isCaught
      isCaught.should.be.true
    })
  })
  describe('catcher', () => {
    it('returns the correct catcher of the snitch', () => {
      loadGame()
      const game = Game.findOne()
      const snitch = game.snitch
      const seeker = game.teams[0].seeker
      seeker.catch(snitch)
      const catcherId = snitch.catcher._id
      catcherId.should.equal(seeker._id)
    })
  })
})
