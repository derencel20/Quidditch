/* eslint-disable no-param-reassign */
import Model from './Model'
import Event from './Event'
import Goal from './Goal'
import Snitch from './Snitch'
import Team from './Team'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Players')
class Player extends Model {

  // Chaser methods
  shoot() {
    const goal = new Goal({
      type: 'counted',
      chaserId: this._id,
      date: new Date,
      gameId: this.gameId,
    })
    goal.save(() => {
      Event.insert({
        gameId: this.gameId,
        notificationType: 'goal counted',
        chaserId: goal.chaserId,
        date: goal.date,
      })
    })
  }

  miss() {
    const miss = new Goal({
      type: 'missed',
      chaserId: this._id,
      date: new Date,
      gameId: this.gameId,
    })
    miss.save(() => {
      Event.insert({
        gameId: this.gameId,
        notificationType: 'goal missed',
        chaserId: miss.chaserId,
        date: miss.date,
      })
    })
  }

  get goals() {
    return Goal.find({ type: 'counted', chaserId: this._id }).count()
  }

  get misses() {
    return Goal.find({ type: 'missed', chaserId: this._id }).count()
  }

  get blockedGoals() {
    return Goal.find({ type: 'blocked', chaserId: this._id }).count()
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
    const block = new Goal({
      type: 'blocked',
      keeperId: this._id,
      chaserId: chaser._id,
      date: new Date,
      gameId: this.gameId,
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

  // Seeker Methods

  catch(snitch) {
    snitch.seekerId = this._id
    snitch.caught = new Date
    snitch.save(() => {
      Event.insert({
        gameId: this.gameId,
        notificationType: 'snitch caught',
        snitchId: snitch._id,
        seekerId: snitch.seekerId,
        date: snitch.caught,
      })
    })
  }

  get snitchPoints() {
    return Snitch.find({ gameId: this.gameId, seekerId: this._id }).count() * 30
  }

  // Player common methods

  get team() {
    return Team.findOne(this.teamId)
  }

  get gameId() {
    return this.team.gameId
  }

  get isChaser() {
    return this.role === 'Chaser'
  }

  get isKeeper() {
    return this.role === 'Keeper'
  }

  get isSeeker() {
    return this.role === 'Seeker'
  }

}

export default Player
