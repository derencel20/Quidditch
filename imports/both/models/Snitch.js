import Model from './Model'
import Event from './Event'
import Seeker from './Seeker'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Snitch')
class Snitch extends Model {

  appears() {
    this.appeared = new Date
    Event.insert({
      gameId: this.gameId,
      notificationType: 'snitch appeared',
      snitchId: this._id,
      date: this.appeared,
    }, () => {
      this.save()
    })
  }

  get catcher() {
    if (this.isCaught) {
      return Seeker.findOne(this.seekerId)
    }
    return false
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
