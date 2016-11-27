import _ from 'underscore'

import Model from './Model'
import Team from './Team'
import Player from './Player'
import Snitch from './Snitch'
import Event from './Event'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Games')
class Game extends Model {

  constructor(doc) {
    super(doc)
    this.teamIds = this.teamIds || []
  }

  @Idempotent
  get teams() {
    return Team.find({ gameId: this._id }).fetch()
  }

  @Idempotent
  get chasers() {
    return Player.find({ gameId: this._id, role: 'Chaser' }).fetch()
  }

  @Idempotent
  get keepers() {
    return Player.find({ gameId: this._id, role: 'Keeper' }).fetch()
  }

  @Idempotent
  get seekers() {
    return Player.find({ gameId: this._id, role: 'Seeker' }).fetch()
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
    return Event.find({ gameId: this._id }).fetch()
  }

  get title() {
    return `${this.teams[0].name} vs ${this.teams[1].name}`
  }

}

export default Game
