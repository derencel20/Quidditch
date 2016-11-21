/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import Game from '/imports/both/models/Game'
import { Component, State, Inject } from 'angular2-now'
import '../views/game-manipulator.html'

@State({
  name: 'app.games.view.manipulator',
  url: '/manipulator',
})
@Component({
  selector: 'game-manipulator',
  templateUrl: 'imports/client/views/game-manipulator.html',
})
@Inject('$scope', '$reactive', '$state', '$stateParams')
class GameManipulatorComponent {

  constructor($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope)
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
  
}

export default GameManipulatorComponent
