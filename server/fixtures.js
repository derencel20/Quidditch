/* eslint-disable no-param-reassign */

import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import { Meteor } from 'meteor/meteor'
import { faker } from 'meteor/practicalmeteor:faker'
import { Accounts } from 'meteor/accounts-base'

function loadGame() {
  if (!Game.find().count()) {
    if (!Meteor.users.find().count()) {
      Accounts.createUser({
        username: 'derencel20',
        password: 'aishiteru',
      })
      Accounts.createUser({
        username: 'commentator',
        password: '12345678',
      })
    }
    const gameId = Game.insert({})

    const teamId1 = Team.insert({})
    const teamId2 = Team.insert({})

    const game = Game.findOne()
    const teamIds = [teamId1, teamId2]
    const teams = Team.find({ _id: { $in: teamIds } })

    teams.forEach((team) => {
      // since there are 3 chasers per team
      team.name = faker.address.country()
      team.gameId = gameId
      for (let i = 0; i < 3; i += 1) {
        Player.insert({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          role: 'chaser',
          teamId: team._id,
        })
      }
      Player.insert({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        role: 'keeper',
        teamId: team._id,
      })
      Player.insert({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        role: 'seeker',
        teamId: team._id,
      })
      team.save()
    })

    game.snitchId = Snitch.insert({ gameId: game._id })
    game.save()
  }
}

export default loadGame
