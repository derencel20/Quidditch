import Model from './Model'
import Chaser from './Chaser'
import Seeker from './Seeker'
import Keeper from './Keeper'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Teams')
class Team extends Model {

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

  // since i've verified that the score formula for both the chaser and seeker works,
  // i think there's no need for further testing since i'm only using reduce for adding
  // The If is just a temporary fix. I'll refactor it later
  get score() {
    if (this.chasers.length !== 0 && this.seeker) {
      const chaserScores = this.chasers.reduce((memo, chaser) => (memo + chaser.score), 0)
      return chaserScores + this.seeker.score
    }
    return 0
  }


}

export default Team
