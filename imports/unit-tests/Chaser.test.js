/* eslint-env mocha */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-absolute-path */
/* eslint-disable import/first */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import Chaser from '/imports/both/models/Chaser'

import { should } from 'meteor/practicalmeteor:chai'

should()

describe('Chaser', () => {
  describe('goals', () => {
    it('returns the nubmer of goals of the player', () => {
      const chaser = new Chaser({ name: faker.name.findName() })
      chaser.shoot()
      chaser.shoot()
      chaser.shoot()
      chaser.shoot()
      chaser.shoot()
      chaser.goals.should.equal(5)
    })
  })
  describe('score', () => {
    const chaser = new Chaser({ name: faker.name.findName() })
    chaser.shoot()
    chaser.shoot()
    chaser.shoot()
    chaser.shoot()
    chaser.shoot()
    chaser.score.should.equal(50)
  })
})
