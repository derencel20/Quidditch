/* eslint-disable no-param-reassign */

import Model from './Model'
import Event from './Event'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Seekers')
class Seeker extends Model {

  catch(snitch) {
    snitch.seekerId = this._id
    snitch.caught = new Date
    snitch.save(() => {
      Event.insert({
        gameId: this.gameId,
        notificationType: 'snitch caught',
        snitchId: snitch._id,
        seekerId: snitch.seekerId,
        date: snitch.caught,
      })
    })
  }

  get score() {
    return Snitch.find({ seekerId: this._id }).count() * 30
  }

}

export default Seeker
