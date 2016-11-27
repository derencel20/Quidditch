import Model from './Model'
import Player from './Player'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Events')
class Event extends Model {

  get seeker() {
    return Player.findOne(this.seekerId)
  }

  get chaser() {
    return Player.findOne(this.chaserId)
  }

  get keeper() {
    return Player.findOne(this.keeperId)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

// Something Changed
}

export default Event
