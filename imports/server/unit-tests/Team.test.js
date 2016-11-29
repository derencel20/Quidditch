/* eslint-env mocha */
import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import Play from '/imports/both/models/Play'
import loadGame from '/server/fixtures'

import { should } from 'meteor/practicalmeteor:chai'

should()

describe('Team', () => {
  afterEach((done) => {
    const collections = [Game, Player, Team, Snitch, Play]
    collections.forEach((collection) => {
      collection.remove({})
    })
    done()
  })
  describe('score', () => {
    it('returns the total number of scores of chasers and seeker', () => {
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
      const { score } = team
      score.should.equal(80)
    })
  })
})
