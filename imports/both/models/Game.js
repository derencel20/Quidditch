import _ from 'underscore'

import Model from './Model'
import Team from './Team'
import Snitch from './Snitch'
import Event from './Event'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Games')
class Game extends Model {

  constructor(doc) {
    super(doc)
    this.teamIds = this.teamIds || []
    this.eventIds = this.eventIds || []
  }

  @Idempotent
  get teams() {
    return Team.find({ _id: { $in: this.teamIds } }).fetch()
  }

  get winner() {
    return _(this.teams).max(team => team.score)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

  // since the snitch has also been tested, there's no need for further testing here
  get hasEnded() {
    return this.snitch.isCaught
  }

  @Idempotent
  get events() {
    return Event.find({ _id: { $in: this.eventIds } })
  }

}

export default Game
