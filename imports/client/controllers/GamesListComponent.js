/* eslint-disable import/no-absolute-path */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import Game from '/imports/both/models/Game'
import { Component, State, Inject } from 'angular2-now'
import '../views/games-list.html'

@State({
  name: 'app.games.list',
  url: '/games/list',
  defaultRoute: true,
})
@Component({
  selector: 'games-list',
  templateUrl: 'imports/client/views/games-list.html',
})
@Inject('$scope', '$reactive', '$state')
class GamesListComponent {

  constructor($scope, $reactive, $state) {
    $reactive(this).attach($scope)
    console.log($state.current.name);
    this.helpers({
      games() {
        return Game.find().fetch()
      },
    })
  }

}

export default GamesListComponent
