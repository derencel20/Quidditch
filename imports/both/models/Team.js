import Model from './Model'
import Player from './Player'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Teams')
class Team extends Model {

  get seeker() {
    return Player.findOne({ teamId: this._id, role: 'Seeker' })
  }

  get keeper() {
    return Player.findOne({ teamId: this._id, role: 'Keeper' })
  }

  @Idempotent
  get chasers() {
    return Player.find({ teamId: this._id, role: 'Chaser' }).fetch()
  }

  // since i've verified that the score formula for both the chaser and seeker works,
  // i think there's no need for further testing since i'm only using reduce for adding
  // The If is just a temporary fix. I'll refactor it later
  get score() {
    if (this.chasers.length !== 0 && this.seeker) {
      const chaserScores = this.chasers.reduce((memo, chaser) => (memo + chaser.score), 0)
      return chaserScores + this.seeker.snitchPoints
    }
    return 0
  }


}

export default Team
