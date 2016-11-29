import _ from 'underscore'

import Model from './Model'
import Team from './Team'
import Player from './Player'
import Snitch from './Snitch'
import Play from './Play'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Games')
class Game extends Model {

  @Idempotent
  get teams() {
    return Team.find({ gameId: this._id }).fetch()
  }

  @Idempotent
  get chasers() {
    return Player.find({ gameId: this._id, role: 'chaser' }).fetch()
  }

  @Idempotent
  get keepers() {
    return Player.find({ gameId: this._id, role: 'keeper' }).fetch()
  }

  @Idempotent
  get seekers() {
    return Player.find({ gameId: this._id, role: 'seeker' }).fetch()
  }

  get winner() {
    return _(this.teams).max(team => team.score)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

  // since the snitch has also been tested, there's no need for further testing here
  get hasEnded() {
    if (this.snitch) {
      return this.snitch.isCaught
    }
    return false
  }

  @Idempotent
  get events() {
    return Play.find({ gameId: this._id }).fetch()
  }

  get title() {
    if (this.teams.length !== 0) {
      return `${this.teams[0].name} vs ${this.teams[1].name}`
    }
    return ''
  }

}

export default Game
