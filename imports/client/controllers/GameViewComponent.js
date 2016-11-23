/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import Game from '/imports/both/models/Game'
import Event from '/imports/both/models/Event'
import Goal from '/imports/both/models/Goal'
import Team from '/imports/both/models/Team'
import Keeper from '/imports/both/models/Keeper'
import Chaser from '/imports/both/models/Chaser'
import Seeker from '/imports/both/models/Seeker'
import Snitch from '/imports/both/models/Snitch'
import { Component, State, Inject } from 'angular2-now'
import { Meteor } from 'meteor/meteor'
import moment from 'moment'
import '../views/game-view.html'

@State({
  name: 'app.games.view',
  url: '/games/view/:gameId',
})
@Component({
  selector: 'game-view',
  templateUrl: 'imports/client/views/game-view.html',
})
@Inject('$scope', '$reactive', '$state', '$stateParams')
class GameViewComponent {

  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope)
    this.subscribe('chasers')
    this.subscribe('keepers')
    this.subscribe('seekers')
    this.subscribe('teams')
    this.subscribe('goals')
    this.subscribe('snitches')
    this.subscribe('events')
    this.subscribe('games')
    const { gameId } = $stateParams
    this.helpers({
      game() {
        Game.find().fetch()
        Snitch.find().fetch()
        Team.find().fetch()
        Event.find().fetch()
        Goal.find().fetch()
        Chaser.find().fetch()
        Keeper.find().fetch()
        Seeker.find().fetch()
        return Game.findOne(gameId)
      },
    })
  }

  snitchAppears() {
    const { snitch } = this.game
    snitch.appear()
    snitch.save()
  }

  format(milliseconds) {
    const duration = moment.duration(milliseconds)
    return `${duration.hours()} hours: ${duration.minutes()} minutes: ${duration.seconds()} seconds`
  }

  getDefaulUTCTime(createdAt) {
    const createdAtNow = moment(createdAt)
    return createdAtNow.format()
  }

  get hasCommentator() {
    return !!Meteor.user()
  }

}

export default GameViewComponent
