/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */

import Game from '/imports/both/models/Game'
import Goal from '/imports/both/models/Goal'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
import Snitch from '/imports/both/models/Snitch'
import Event from '/imports/both/models/Event'


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

Meteor.publish('goals', (id) => {
  return Goal.find({ gameId: id })
}, {
  url: '/publications/games/:0/goals',
})

Meteor.publish('snitch', (id) => {
  return Snitch.find({ gameId: id })
}, {
  url: '/publications/games/:0/snitch',
})

Meteor.publish('events', (id) => {
  return Event.find({ gameId: id })
}, {
  url: '/publications/games/:0/events',
})

Meteor.publish('allTeams', () => {
  return Team.find()
})

Meteor.publish('teams', (id) => {
  return Team.find({ gameId: id })
}, {
  url: '/publications/games/:0/teams',
})
