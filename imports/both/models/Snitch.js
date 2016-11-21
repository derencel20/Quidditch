
import Model from './Model'
import Seeker from './Seeker'
import Event from './Event'

import SetupCollection from '../decorators/SetupCollection'
import Idempotent from '../decorators/Idempotent'

@SetupCollection('Snitch')
class Snitch extends Model {

  constructor(doc) {
    super(doc)
    this.eventIds = this.eventIds || []
  }

  appear() {
    this.appeared = new Date
    const eventId = Event.insert({
      notificationType: 'snitch appeared',
      snitchId: this._id,
      date: this.appeared,
    }, () => {
      this.eventIds.push(eventId)
      this.save()
    })
  }

  get catcher() {
    return Seeker.findOne(this.seekerId)
  }

  // returns the time(in milliSeconds) the snitch was caught
  get duration() {
    return this.caught.getTime() - this.appeared.getTime()
  }

  get hasAppeared() {
    return !!this.appeared
  }

  get isCaught() {
    return !!this.caught
  }

  @Idempotent
  get events() {
    Event.find({ snitchId: this._id }).fetch()
  }

}

export default Snitch
