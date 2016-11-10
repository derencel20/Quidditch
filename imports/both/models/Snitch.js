
import Model from './Model'
import Seeker from './Seeker'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Snitch')
class Snitch extends Model {

  get catcher() {
    return Seeker.findOne(this.playerId)
  }

  // returns the time(in milliSeconds) the snitch was caught
  get duration() {
    return this.caught.getTime() - this.appeared.getTime()
  }

  get hasAppeared() {
    return !!this.appeared
  }

  get isCaught() {
    return !!this.caught
  }

}

export default Snitch
