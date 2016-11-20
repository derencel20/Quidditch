/* eslint-disable no-param-reassign */

import Player from './Player'
import Event from './Event'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Seekers')
class Seeker extends Player {

  catch(snitch) {
    snitch.playerId = this._id
    snitch.caught = new Date
    snitch.save(() => {
      const eventId = Event.insert({
        notificationType: 'snitch',
        seekerId: this._id,
        snitchId: snitch._id,
        date: snitch.caught,
      }, () => {
        this.eventIds.push(eventId)
      })
    })
  }

  get score() {
    // plus 30 points if the snitch is caught
    return Snitch.find({ seekerId: this._id }).count() * 30
  }

}

export default Seeker
