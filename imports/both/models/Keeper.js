import Model from './Model'
import Block from './Block'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Keepers')
class Keeper extends Model {

  // I used a collection for blocks here since querying for the block count will be another chore
  // example: I'll have to query for blocks() method like: Chaser.find({ shots: { $elemMatch } })
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
