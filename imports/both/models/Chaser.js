import _ from 'underscore'

import Model from './Model'
import Event from './Event'
import Block from './Block'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Chasers')
class Chaser extends Model {

  constructor(doc) {
    super(doc)
    this.shots = this.shots || []
  }

  shoot() {
    const goal = {
      type: 'goal',
      chaserId: this._id,
    }
    this.shots.push(goal)
    Event.insert(_(goal).extend({ date: new Date }))
  }

  miss() {
    const miss = {
      type: 'miss',
      chaserId: this._id,
    }
    this.shots.push(miss)
    Event.insert(_(miss).extend({ date: new Date }))
  }

  get goals() {
    return this.shots.filter(shot => (shot.type === 'goal')).length
  }

  get misses() {
    return this.shots.filter(shot => (shot.type === 'miss')).length
  }

  // if blocks were in an array, it would be hard to query for the keeper
  get blockedGoals() {
    return Block.find({ chaserId: this._id }).count()
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
