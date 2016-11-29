/* eslint-disable no-param-reassign */

import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import { Meteor } from 'meteor/meteor'
import { faker } from 'meteor/practicalmeteor:faker'
import { Accounts } from 'meteor/accounts-base'

function loadGames() {
  if (!Game.find().count()) {
    if (!Meteor.users.find().count()) {
      Accounts.createUser({
        username: 'commentator',
        password: '12345678',
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      })
      Accounts.createUser({
        username: 'derencel20',
        password: '12345678',
        profile: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        },
      })
    }
    const gameId1 = Game.insert({})
    const gameId2 = Game.insert({})
    const gameId3 = Game.insert({})

    const teamId1 = Team.insert({})
    const teamId2 = Team.insert({})
    const teamId3 = Team.insert({})
    const teamId4 = Team.insert({})
    const teamId5 = Team.insert({})
    const teamId6 = Team.insert({})

    const gameIds = [gameId1, gameId2, gameId3]
    const games = Game.find({ _id: { $in: gameIds } })
    const teamIds = [teamId1, teamId2, teamId3, teamId4, teamId5, teamId6]
    const teams = Team.find({ _id: { $in: teamIds } })

    teams.forEach((team, index) => {
      // since there are 3 chasers per team
      team.name = faker.address.country()
      team.gameId = gameIds[Math.floor(index / 2)]
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

    games.forEach((game) => {
      game.snitchId = Snitch.insert({ gameId: game._id })
      game.save()
    })
  }
}

export default loadGames
