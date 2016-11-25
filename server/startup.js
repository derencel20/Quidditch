/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */

import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Chaser from '/imports/both/models/Chaser'
import Seeker from '/imports/both/models/Seeker'
import Keeper from '/imports/both/models/Keeper'
import Snitch from '/imports/both/models/Snitch'
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
    const game1 = new Game
    const game2 = new Game
    const game3 = new Game

    const team1 = new Team
    const team2 = new Team
    const team3 = new Team
    const team4 = new Team
    const team5 = new Team
    const team6 = new Team

    const games = [game1, game2, game3]
    const teams = [team1, team2, team3, team4, team5, team6]
    const teamIds = []

    teams.forEach((team) => {
      // since there are 3 chasers per team
      team.name = faker.address.country()
      for (let i = 0; i < 3; i++) {
        const chaser = new Chaser({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
        })
        team.chaserIds.push(chaser.save())
      }
      const keeper = new Keeper({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      })
      const seeker = new Seeker({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      })
      team.keeperId = keeper.save()
      team.seekerId = seeker.save()
      teamIds.push(team.save())
    })

    games[0].teamIds.push(teamIds[0])
    games[0].teamIds.push(teamIds[1])
    games[1].teamIds.push(teamIds[2])
    games[1].teamIds.push(teamIds[3])
    games[2].teamIds.push(teamIds[4])
    games[2].teamIds.push(teamIds[5])

    games.forEach((game) => {
      game.snitchId = Snitch.insert({})
      game.save()
    })
  }
}

export default loadGames
