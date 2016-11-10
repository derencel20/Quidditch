/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { Component, State, bootstrap } from 'angular2-now'
import './init.js'
import '../views/app.html'

@State({
  name: 'app',
  abstract: true,
  html5Mode: true,
})
@Component({
  selector: 'app',
  templateUrl: 'imports/client/views/app.html',
  transclude: true,
  replace: true,
})
export default class MainComponent {

}

bootstrap(MainComponent)
