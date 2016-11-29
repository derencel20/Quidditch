import Model from './Model'
import Play from './Play'
import Team from './Team'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Players')
class Player extends Model {

  // Chaser methods
  shoot() {
    Play.insert({
      type: 'goal counted',
      chaserId: this._id,
      date: new Date,
      gameId: this.gameId,
    })
  }

  miss() {
    Play.insert({
      type: 'goal missed',
      chaserId: this._id,
      date: new Date,
      gameId: this.gameId,
    })
  }

  get goals() {
    return Play.find({ type: 'goal counted', chaserId: this._id }).count()
  }

  get misses() {
    return Play.find({ type: 'goal missed', chaserId: this._id }).count()
  }

  get blockedGoals() {
    return Play.find({ type: 'goal blocked', chaserId: this._id }).count()
  }

  get score() {
    return this.goals * 10 // 10 points per goal
  }

  get shootAttempts() {
    return this.misses + this.goals + this.blockedGoals
  }

  get accuracy() {
    return (this.goals / this.shootAttempts) * 100
  }

  // Keeper methods

  block(chaser) {
    Play.insert({
      type: 'goal blocked',
      keeperId: this._id,
      chaserId: chaser._id,
      date: new Date,
      gameId: this.gameId,
    })
  }

  get blocks() {
    return Play.find({ type: 'goal blocked', keeperId: this._id }).count()
  }

  // Seeker Methods

  catch(snitch) {
    Play.insert({
      type: 'snitch caught',
      snitchId: snitch._id,
      seekerId: this._id,
      date: new Date,
      gameId: this.gameId,
    })
  }

  get snitchPoints() {
    return Play.find({ type: 'snitch caught', seekerId: this._id }).count() * 30
  }

  // Player common methods

  get team() {
    return Team.findOne(this.teamId)
  }

  get gameId() {
    return this.team.gameId
  }

  get isChaser() {
    return this.role === 'chaser'
  }

  get isKeeper() {
    return this.role === 'keeper'
  }

  get isSeeker() {
    return this.role === 'seeker'
  }

}

export default Player
