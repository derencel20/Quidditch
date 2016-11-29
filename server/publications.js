import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import Play from '/imports/both/models/Play'

import { Meteor } from 'meteor/meteor'

Meteor.publish('games', () => {
  return Game.find()
}, {
  url: '/publications/games',
})

Meteor.publish('game', (gameId) => {
  return Game.find(gameId)
}, {
  url: '/publications/games/:0',
})

Meteor.publish('players', (id) => {
  const game = Game.findOne(id)
  const { teams } = game
  const teamIds = teams.map(team => team._id)
  return Player.find({ teamId: { $in: teamIds } })
}, {
  url: '/publications/games/:0/players',
})

Meteor.publish('plays', (id) => {
  return Play.find({ gameId: id })
}, {
  url: '/publications/games/:0/plays',
})

Meteor.publish('snitch', (id) => {
  return Snitch.find({ gameId: id })
}, {
  url: '/publications/games/:0/snitch',
})

Meteor.publish('allTeams', () => {
  return Team.find()
})

Meteor.publish('teams', (id) => {
  return Team.find({ gameId: id })
}, {
  url: '/publications/games/:0/teams',
})

Meteor.publish('users', () => {
  return Meteor.users.find({}, { fields: { profile: 1, _id: 1 } })
})
