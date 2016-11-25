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
      Event.insert({
        gameId: this.gameId,
        notificationType: 'snitch caught',
        snitchId: snitch._id,
        date: snitch.caught,
      })
    })
  }

  get score() {
    return Snitch.find({ seekerId: this._id }).count() * 30
  }

}

export default Seeker
