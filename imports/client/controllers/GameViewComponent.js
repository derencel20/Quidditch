/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import Game from '/imports/both/models/Game'
import Event from '/imports/both/models/Event'
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
    const { gameId } = $stateParams
    this.helpers({
      game() {
        Event.find().fetch()
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
