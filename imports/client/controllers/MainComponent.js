import { Component, State, bootstrap, Inject } from 'angular2-now'
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
@Inject('$scope', '$reactive')
export default class MainComponent {

  constructor($scope, $reactive) {
    $reactive(this).attach($scope)
    this.subscribe('users')
  }

  get commentator() {
    return Meteor.user()
  }

  get label() {
    const { profile } = this.commentator
    const { firstName, lastName } = profile
    return `${lastName}, ${firstName}`
  }

  get hasCommentator() {
    return !!Meteor.user()
  }

  logout() {
    Meteor.logout()
  }

}

bootstrap(MainComponent)
