/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import Game from '/imports/both/models/Game'
import { Component, State, Inject } from 'angular2-now'
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
    console.log($state.current.name);
    const { gameId } = $stateParams
    this.helpers({
      game() {
        return Game.findOne(gameId)
      },
    })
  }

  snitchAppears() {
    const { snitch } = this.game
    snitch.appear()
    snitch.save()
  }

  showValue(value) {
    console.log(value);
  }
}

export default GameViewComponent
