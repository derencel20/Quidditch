import Player from './Player'
import Goal from './Goal'
import Event from './Event'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Keepers')
class Keeper extends Player {

  block(chaser) {
    const block = new Goal({
      type: 'blocked',
      keeperId: this._id,
      chaserId: chaser._id,
    })
    const id = block.save(() => {
      const eventId = Event.insert({ notificationType: 'block', blockId: id, date: new Date }, () => {
        this.eventIds.push(eventId)
      })
    })
  }

  get blocks() {
    return Goal.find({ type: 'blocked', keeperId: this._id }).count()
  }

}

export default Keeper
