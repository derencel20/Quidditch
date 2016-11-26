import Model from './Model'
import Event from './Event'
import Goal from './Goal'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Chasers')
class Chaser extends Model {

  shoot() {
    const goal = new Goal({
      type: 'counted',
      chaserId: this._id,
      date: new Date,
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
    return Goal.find({ type: 'goal blocked', chaserId: this._id }).count()
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

}

export default Chaser
