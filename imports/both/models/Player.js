import Model from './Model'
import Team from './Team'

class Player extends Model {

  get team() {
    return Team.findOne(this.teamId)
  }

}

export default Player
