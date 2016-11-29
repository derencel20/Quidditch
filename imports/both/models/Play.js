import Model from './Model'
import Player from './Player'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Plays')
class Play extends Model {

  get chaser() {
    return Player.findOne(this.chaserId)
  }

  get keeper() {
    return Player.findOne(this.keeperId)
  }

  get seeker() {
    return Player.findOne(this.seekerId)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

}

export default Play
