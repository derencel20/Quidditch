import Model from './Model'
import Chaser from './Chaser'
import Keeper from './Keeper'
import Seeker from './Seeker'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Events')
class Event extends Model {

  get seeker() {
    return Seeker.findOne(this.seekerId)
  }

  get chaser() {
    return Chaser.findOne(this.chaserId)
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
