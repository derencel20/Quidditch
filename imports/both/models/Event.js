import Model from './Model'
import Goal from './Goal'
import Chaser from './Chaser'
import Keeper from './Keeper'
import Seeker from './Seeker'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Events')
class Event extends Model {

  get goal() {
    return Goal.findOne(this.goalId)
  }

  get seeker() {
    return Seeker.findOne(this.seekerId)
  }

  get chaser() {
    return Chaser.findOne(this.seekerId)
  }

  get keeper() {
    return Keeper.findOne(this.keeperId)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

// Something Changed
}

export default Event
