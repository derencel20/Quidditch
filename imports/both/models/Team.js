import Model from './Model'
import Player from './Player'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Teams')
class Team extends Model {

  get seeker() {
    return Player.findOne({ teamId: this._id, role: 'seeker' })
  }

  get keeper() {
    return Player.findOne({ teamId: this._id, role: 'keeper' })
  }

  @Idempotent
  get chasers() {
    return Player.find({ teamId: this._id, role: 'chaser' }).fetch()
  }

  get score() {
    if (this.chasers.length !== 0 && this.seeker) {
      const chaserScores = this.chasers.reduce((memo, chaser) => (memo + chaser.score), 0)
      return chaserScores + this.seeker.snitchPoints
    }
    return 0
  }


}

export default Team
