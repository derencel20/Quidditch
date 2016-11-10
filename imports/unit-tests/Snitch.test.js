/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable no-unused-expressions */

import { should } from 'meteor/practicalmeteor:chai'
import Snitch from '/imports/both/models/Snitch'

should()

describe('Snitch', () => {
  const snitch = new Snitch({ appeared: new Date('2016-11-10T16:00'), caught: new Date('2016-11-10T17:00') })
  it('returns the correct duration it lasted', () => {
    const minutes = snitch.duration / (1000 * 60)  // 1 minute = 1000 milliseconds
    minutes.should.equal(60)
  })
  it('appears when its date of appearance is set', () => {
    snitch.hasAppeared.should.be.true
  })
  it('is caught when its date of capture is set', () => {
    snitch.isCaught.should.be.true
  })
})
