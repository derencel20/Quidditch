import Game from '/imports/both/models/Game'
import Play from '/imports/both/models/Play'
import Team from '/imports/both/models/Team'
import Player from '/imports/both/models/Player'

import moment from 'moment'
import { Component, State, Inject } from 'angular2-now'
import { Meteor } from 'meteor/meteor'
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
    this.subscribe('plays', () => [gameId])
    this.subscribe('snitch', () => [gameId])
    this.helpers({
      game() {
        const game = Game.findOne()
        if (!game) {
          $state.go('app.games.list')
        }
        Play.find().fetch()
        Player.find().fetch()
        Team.find().fetch()
        return game
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
