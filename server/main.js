import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
import Snitch from '/imports/both/models/Snitch'
import Player from '/imports/both/models/Player'
import Play from '/imports/both/models/Play'
import loadGames from './startup'


Meteor.startup(() => {
  loadGames()
})

Accounts.config({
  forbidClientAccountCreation: true,
})

Player.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
    return userId
  },
})

Play.collection.allow({
  insert(userId) {
    return userId
  },
  update(userId) {
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
