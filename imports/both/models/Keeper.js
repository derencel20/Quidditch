import Model from './Model'
import Block from './Block'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Keepers')
class Keeper extends Model {

  block(chaser) {
    const block = new Block({ keeperId: this._id, chaserId: chaser._id })
    const id = block.save(() => {
      Event.insert({
        notificationType: 'block',
        blockId: id,
        date: new Date,
      })
    })
  }

  get blocks() {
    return Block.find({ keeperId: this._id }).count()
  }

}

export default Keeper
