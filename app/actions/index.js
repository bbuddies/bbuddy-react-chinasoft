import * as CommonActions from './common'
import * as ActivityActions from './activity'
import merge from 'lodash/object/merge'

const actions = merge({}, CommonActions, ActivityActions)

export default actions