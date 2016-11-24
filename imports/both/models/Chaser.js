import Player from './Player'
import Event from './Event'
import Goal from './Goal'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Chasers')
class Chaser extends Player {

  shoot() {
    const goal = new Goal({
      type: 'counted',
      chaserId: this._id,
      date: new Date,
    })
    const id = goal.save(() => {
      const eventId = Event.insert({
        stimulatorId: this._id,
        notificationType: 'goal counted',
        goalId: id,
        date: goal.date,
      }, () => {
        this.eventIds.push(eventId)
      })
    })
  }

  miss() {
    const miss = new Goal({
      type: 'missed',
      chaserId: this._id,
      date: new Date,
    })
    const id = miss.save(() => {
      const eventId = Event.insert({
        stimulatorId: this._id,
        notificationType: 'goal missed',
        goalId: id,
        date: miss.date,
      }, () => {
        this.eventIds.push(eventId)
        this.save()
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
