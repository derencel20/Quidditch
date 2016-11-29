/* eslint-disable no-alert */
import { Component, State, Inject } from 'angular2-now'
import { Meteor } from 'meteor/meteor'
import '../views/login.html'

@State({
  name: 'app.login',
  url: '/login',
})
@Component({
  selector: 'commentator-login',
  templateUrl: 'imports/client/views/login.html',
})
@Inject('$state')
class CommentatorLoginComponent {

  constructor($state) {
    this.user = {}
    this.$state = $state
  }

  login() {
    Meteor.loginWithPassword(this.user.username, this.user.password, (err) => {
      if (err) {
        alert(err.reason)
      } else {
        this.$state.go('app.games.list')
      }
    })
  }

}

export default CommentatorLoginComponent
