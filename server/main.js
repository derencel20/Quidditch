/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */

import Game from '/imports/both/models/Game'
import Goal from '/imports/both/models/Goal'
import Team from '/imports/both/models/Team'
import Keeper from '/imports/both/models/Keeper'
import Chaser from '/imports/both/models/Chaser'
import Seeker from '/imports/both/models/Seeker'
import Snitch from '/imports/both/models/Snitch'
import Event from '/imports/both/models/Event'

import loadGames from './startup'

Meteor.startup(() => {
  loadGames()
})

Chaser.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})

Keeper.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})

Seeker.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})

Event.collection.allow({
  insert(userId) {
    return userId
  },
})

Game.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})

Goal.collection.allow({
  insert(userId) {
    return userId
  },
})

Snitch.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})

Team.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})
