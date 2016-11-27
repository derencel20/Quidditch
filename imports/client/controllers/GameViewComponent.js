/* eslint-disable no-unused-vars */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

// some

import Game from '/imports/both/models/Game'
import Event from '/imports/both/models/Event'
import Goal from '/imports/both/models/Goal'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'
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
    const { gameId } = $stateParams
    this.subscribe('teams', () => [gameId])
    this.subscribe('game', () => [gameId])
    this.subscribe('players', () => [gameId])
    this.subscribe('events', () => [gameId])
    this.subscribe('goals', () => [gameId])
    this.subscribe('snitch', () => [gameId])
    this.helpers({
      game() {
        Event.find().fetch()
        Player.find().fetch()
        Goal.find().fetch()
        Team.find().fetch()
        return Game.findOne()
      },
    })
  }

  getEnemyChasers(keeper, teams) {
    if (keeper) {
      const enemyTeam = teams.find(team => (team._id !== keeper.teamId))
      return enemyTeam.chasers
    }
    return 0
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
