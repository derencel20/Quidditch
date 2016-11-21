import Model from './Model'
import Chaser from './Chaser'
import Keeper from './Keeper'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Goal')
class Goal extends Model {

  get chaser() {
    return Chaser.findOne(this.chaserId)
  }

  get keeper() {
    return Keeper.findOne(this.keeperId)
  }

}

export default Goal
