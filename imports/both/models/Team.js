import Player from './Player'
import Chaser from './Chaser'
import Seeker from './Seeker'
import Keeper from './Keeper'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Teams')
class Team extends Player {

  // 3 chasers, 1 keeper, and 1 seeker per team according to the rules
  get seeker() {
    return Seeker.findOne({ teamId: this._id })
  }

  get keeper() {
    return Keeper.findOne({ teamId: this._id })
  }

  @Idempotent
  get chasers() {
    return Chaser.find({ teamId: this._id }).fetch()
  }

  get score() {
    const chaserScores = this.chasers.reduce((memo, current) => (memo + current.score), 0)
    return chaserScores + this.seeker.score
  }

}

export default Team
