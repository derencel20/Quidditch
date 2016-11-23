import _ from 'underscore'

import Model from './Model'
import Team from './Team'
import Snitch from './Snitch'
import Event from './Event'

import Idempotent from '../decorators/Idempotent'
import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Games')
class Game extends Model {

  constructor(doc) {
    super(doc)
    this.teamIds = this.teamIds || []
  }

  @Idempotent
  get teams() {
    return Team.find({ _id: { $in: this.teamIds } }).fetch()
  }

  get chasers() {
    return this.teams.map(team => team.chasers).reduce((memo, chaser) => {
      return memo.concat(chaser)
    }, [])
  }

  get keepers() {
    return this.teams.map(team => team.keeper)
  }

  get seekers() {
    return this.teams.map(team => team.seeker)
  }

  get winner() {
    return _(this.teams).max(team => team.score)
  }

  get playerEventIds() {
    const seekerEventIds = this.seekers.map(seeker => seeker.eventIds).reduce((memo, eventId) => {
      return memo.concat(eventId)
    }, [])
    const keeperEventIds = this.keepers.map(keeper => keeper.eventIds).reduce((memo, eventId) => {
      return memo.concat(eventId)
    }, [])
    const chasersEventIds = this.chasers.map(chaser => chaser.eventIds).reduce((memo, eventId) => {
      return memo.concat(eventId)
    }, [])

    return seekerEventIds.concat(keeperEventIds).concat(chasersEventIds)
  }

  get snitch() {
    return Snitch.findOne(this.snitchId)
  }

  // since the snitch has also been tested, there's no need for further testing here
  get hasEnded() {
    return this.snitch.isCaught
  }

  @Idempotent
  get events() {
    return Event.find({ _id: { $in: [...this.playerEventIds, ...this.snitch.eventIds] } }).fetch()
  }

  get title() {
    return `${this.teams[0].name} vs ${this.teams[1].name}`
  }

}

export default Game
