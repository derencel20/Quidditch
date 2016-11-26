/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */

import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Chaser from '/imports/both/models/Chaser'
import Seeker from '/imports/both/models/Seeker'
import Keeper from '/imports/both/models/Keeper'
import Snitch from '/imports/both/models/Snitch'
import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

function loadGames() {
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
        const chaser = new Chaser({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          gameId: gameIds[Math.floor(index / 2)],
          teamId: team._id,
        })
        chaser.save()
      }
      const keeper = new Keeper({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gameId: gameIds[Math.floor(index / 2)],
        teamId: team._id,
      })
      const seeker = new Seeker({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gameId: gameIds[Math.floor(index / 2)],
        teamId: team._id,
      })
      keeper.save()
      seeker.save()
      teamIds.push(team.save())
    })

    games.forEach((game) => {
      game.snitchId = Snitch.insert({ gameId: game._id })
      game.save()
    })
  }
}

export default loadGames
