import Game from '/imports/both/models/Game'
import Team from '/imports/both/models/Team'
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

  constructor($scope, $reactive) {
    $reactive(this).attach($scope)
    this.subscribe('allTeams')
    this.subscribe('games')
    this.helpers({
      games() {
        Team.find()
        return Game.find()
      },
    })
  }

}

export default GamesListComponent
