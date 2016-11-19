import loadGames from './startup'

Meteor.startup(() => {
  loadGames()
})
