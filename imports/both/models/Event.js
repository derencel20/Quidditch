import Model from './Model'
import Goal from './Goal'
import Seeker from './Seeker'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Events')
class Event extends Model {

  get goal() {
    return Goal.findOne(this.goalId)
  }

  get seeker() {
    return Seeker.findOne(this.snitch.seekerId)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

// Something Changed
}

export default Event
