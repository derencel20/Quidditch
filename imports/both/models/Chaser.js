import Player from './Player'
import Goal from './Goal'
import Event from './Event'
import Miss from './Miss'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Chasers')
class Chaser extends Player {

  // assuming na shoot iya gn tira
  shoot() {
    const goal = new Goal({ chaserId: this._id })
    const id = goal.save(() => {
      Event.insert({
        notificationType: 'goal',
        goalId: id,
        date: new Date,
      })
    })
  }

  miss() {
    const miss = new Miss({ chaserId: this._id })
    const id = miss.save(() => {
      Event.insert({
        notificationType: 'miss',
        missId: id,
        date: new Date,
      })
    })
  }

  get goals() {
    return Goal.find({ chaserId: this._id }).count()
  }

  get misses() {
    return Miss.find({ chaserId: this._id }).count()
  }

  get score() {
    return this.goals * 10 // 10 points per goal
  }

  get shootAttempts() {
    return this.misses + this.goals
  }

  get accuracy() {
    return (this.goals / this.shootAttempts) * 100
  }

  get goalPercentage() {
    return this.score / this.team.score
  }

}

export default Chaser
