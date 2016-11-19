import Model from './Model'

class Player extends Model {

  constructor(doc) {
    super(doc)
    this.eventIds = this.eventIds || []
  }

}

export default Player
