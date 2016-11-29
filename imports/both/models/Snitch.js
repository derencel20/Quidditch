import Model from './Model'
import Play from './Play'
import Player from './Player'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Snitch')
class Snitch extends Model {

  appears() {
    Play.insert({
      type: 'snitch appeared',
      snitchId: this._id,
      date: new Date,
      gameId: this.gameId,
    })
  }

  get playWhenItAppeared() {
    return Play.findOne({ snitchId: this._id, type: 'snitch appeared' })
  }

  get playWhenItWasCaught() {
    return Play.findOne({ snitchId: this._id, type: 'snitch caught' })
  }

  get catcher() {
    const { seekerId } = this.playWhenItWasCaught
    return Player.findOne(seekerId)
  }

  // returns the time(in milliSeconds) the snitch was caught
  get duration() {
    if (this.playWhenItAppeared && this.playWhenItWasCaught) {
      const end = this.playWhenItWasCaught.date.getTime()
      const start = this.playWhenItAppeared.date.getTime()
      return end - start
    }
    return 0
  }

  get hasAppeared() {
    return !!this.playWhenItAppeared
  }

  get isCaught() {
    return !!this.playWhenItWasCaught
  }

}

export default Snitch
