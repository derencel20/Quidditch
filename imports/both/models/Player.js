import Model from './Model'
import Team from './Team'

class Player extends Model {

  get team() {
    return Team.findOne(this.teamId)
  }

  get gameId() {
    return this.team.gameId
  }

}

export default Player
