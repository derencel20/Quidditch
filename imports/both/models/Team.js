import _ from 'underscore'

import Model from './Model'
import Chaser from './Chaser'
import Seeker from './Seeker'
import Keeper from './Keeper'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Teams')
class Team extends Model {

  constructor(doc) {
    super(doc)
    this.chaserIds = this.chaserIds || []
  }

  // 3 chasers, 1 keeper, and 1 seeker per team according to the rules
  get seeker() {
    return Seeker.findOne(this.seekerId)
  }

  get keeper() {
    return Keeper.findOne(this.keeperId)
  }

  @Idempotent
  get chasers() {
    return Chaser.find({ _id: { $in: this.chaserIds } }).fetch()
  }

  // since i've verified that the score formula for both the chaser and seeker works,
  // i think there's no need for further testing since i'm only using reduce for adding
  get score() {
    const chaserScores = this.chasers.reduce((memo, chaser) => (memo + chaser.score), 0)
    return chaserScores + this.seeker.score
  }


}

export default Team
