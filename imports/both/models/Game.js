import _ from 'underscore'

import Model from './Model'
import Team from './Team'
import Snitch from './Snitch'
import Chaser from './Chaser'
import Keeper from './Keeper'
import Seeker from './Seeker'
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
    return Chaser.find({ gameId: this._id }).fetch()
  }

  @Idempotent
  get keepers() {
    return Keeper.find({ gameId: this._id }).fetch()
  }

  @Idempotent
  get seekers() {
    return Seeker.find({ gameId: this._id }).fetch()
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
