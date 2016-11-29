/* eslint-disable no-param-reassign */
/* eslint-disable new-cap */

import { Mongo } from 'meteor/mongo'

function SetupCollection(collectionName) {
  return function setupcollection(target) {
    target.collection = new Mongo.Collection(collectionName, {
      transform(doc) {
        return new target(doc)
      },
    })
  }
}

export default SetupCollection
