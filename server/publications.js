/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-extraneous-dependencies */

import { Meteor } from 'meteor/meteor'
import Game from '/imports/both/models/Game'
import Goal from '/imports/both/models/Goal'
import Team from '/imports/both/models/Team'
import Keeper from '/imports/both/models/Keeper'
import Chaser from '/imports/both/models/Chaser'
import Seeker from '/imports/both/models/Seeker'
import Snitch from '/imports/both/models/Snitch'
import Event from '/imports/both/models/Event'


Meteor.publish('games', () => {
  return Game.find()
}, {
  url: '/games',
})

Meteor.publish('chasers', () => {
  return Chaser.find()
}, {
  url: '/chasers',
})

Meteor.publish('keepers', () => {
  return Keeper.find()
}, {
  url: '/keepers',
})

Meteor.publish('seekers', () => {
  return Seeker.find()
}, {
  url: '/seekers',
})

Meteor.publish('goals', () => {
  return Goal.find()
}, {
  url: '/goals',
})

Meteor.publish('snitches', () => {
  return Snitch.find()
}, {
  url: '/snitches',
})

Meteor.publish('events', () => {
  return Event.find()
}, {
  url: '/events',
})

Meteor.publish('teams', () => {
  return Team.find()
}, {
  url: '/teams',
})
