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
    let chasers = this.teams.map(team => team.chasers)
    chasers = _(chasers).flatten()
    return chasers.filter(chaser => !!chaser)
  }

  get keepers() {
    let keepers = this.teams.map(team => team.keepers)
    keepers = _(keepers).flatten()
    return keepers.filter(keeper => !!keeper)
  }

  get seekers() {
    let seekers = this.teams.map(team => team.seekers)
    seekers = _(seekers).flatten()
    return seekers.filter(seeker => !!seeker)
  }

  get winner() {
    return _(this.teams).max(team => team.score)
  }

  get playerEventIds() {
    let seekerEventIds = this.seekers.map(seeker => seeker.eventIds)
    let keeperEventIds = this.keepers.map(keeper => keeper.eventIds)
    let chasersEventIds = this.chasers.map(chaser => chaser.eventIds)

    seekerEventIds = _(seekerEventIds).flatten()
    keeperEventIds = _(keeperEventIds).flatten()
    chasersEventIds = _(chasersEventIds).flatten()

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
    return Event.find({ _id: { $in: this.playerEventIds } }).fetch()
  }

  get title() {
    return `${this.teams[0].name} vs ${this.teams[1].name}`
  }

}

export default Game
