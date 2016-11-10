/* eslint-disable no-param-reassign */
import { Meteor } from 'meteor/meteor'

function SetupAccount(target) {
  Meteor.users._transform = function (doc) {
    return new target(doc)
  }
  target.collection = Meteor.users
}

export default SetupAccount
