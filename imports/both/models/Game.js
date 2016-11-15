import _ from 'underscore'

import Model from './Model'
import Team from './Team'
import Snitch from './Snitch'

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

}

export default Game
