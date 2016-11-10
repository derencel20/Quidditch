import Model from './Model'

import SetupCollection from '../decorators/SetupCollection'

@SetupCollection('Goal')
class Goal extends Model {
  // purpose is for recording the scores
}

export default Goal
