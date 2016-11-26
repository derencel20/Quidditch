import Model from './Model'
import Event from './Event'
import Goal from './Goal'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Keepers')
class Keeper extends Model {

  block(chaser) {
    const block = new Goal({
      type: 'goal blocked',
      keeperId: this._id,
      chaserId: chaser._id,
      date: new Date,
    })
    block.save(() => {
      Event.insert({
        gameId: this.gameId,
        notificationType: 'goal blocked',
        keeperId: block.keeperId,
        chaserId: block.chaserId,
        date: block.date,
      })
    })
  }

  get blocks() {
    return Goal.find({ type: 'goal blocked', keeperId: this._id }).count()
  }

}

export default Keeper
