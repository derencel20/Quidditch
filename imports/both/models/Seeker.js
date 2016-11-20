/* eslint-disable no-param-reassign */

import Model from './Model'
import Event from './Event'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Seekers')
class Seeker extends Model {

  catch(snitch) {
    snitch.playerId = this._id
    snitch.caught = new Date
    Event.insert({
      notificationType: 'snitch',
      playerId: this._id,
      snitchId: snitch._id,
      date: new Date,
    })
  }

  get score() {
    // plus 30 points if the snitch is caught
    return Snitch.find({ playerId: this._id }).count() * 30
  }

}

export default Seeker
// something 
