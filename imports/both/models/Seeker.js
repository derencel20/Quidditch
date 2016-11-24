/* eslint-disable no-param-reassign */

import Player from './Player'
import Event from './Event'
import Snitch from './Snitch'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Seekers')
class Seeker extends Player {

  catch(snitch) {
    snitch.seekerId = this._id
    snitch.caught = new Date
    snitch.save(() => {
      const eventId = Event.insert({
        stimulatorId: this._id,
        notificationType: 'snitch caught',
        snitchId: snitch._id,
        date: snitch.caught,
      }, () => {
        this.eventIds.push(eventId)
        this.save()
      })
    })
  }

  get score() {
    return Snitch.find({ seekerId: this._id }).count() * 30
  }

}

export default Seeker
