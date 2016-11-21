/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

import { Component, State, bootstrap } from 'angular2-now'
import { Meteor } from 'meteor/meteor'
import './init.js'
import '../views/app.html'

@State({
  name: 'app',
  abstract: true,
  html5Mode: true,
})
@State({
  name: 'app.games',
  abstract: true,
})
@Component({
  selector: 'app',
  templateUrl: 'imports/client/views/app.html',
  transclude: true,
  replace: true,
})
export default class MainComponent {

  get hasCommentator() {
    return !!Meteor.user()
  }

}

bootstrap(MainComponent)
