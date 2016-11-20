import Player from './Player'
import Goal from './Goal'
import Event from './Event'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Keepers')
class Keeper extends Player {

  block(chaser) {
    const block = new Goal({
      type: 'blocked',
      keeperId: this._id,
      chaserId: chaser._id,
    })
    const id = block.save(() => {
      const eventId = Event.insert({ notificationType: 'block', blockId: id, date: new Date }, () => {
        this.eventIds.push(eventId)
      })
    })
  }

  get blocks() {
    return Goal.find({ type: 'blocked', keeperId: this._id }).count()
  }

  getEnemyChasers(team1, team2) {
    const teams = [team1, team2]
    const enemyTeam = teams.find(team => (team.keeperId !== this._id))
    return enemyTeam.chasers
  }

}

export default Keeper
