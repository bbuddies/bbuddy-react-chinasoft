import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import values from 'lodash/values'
import * as AccountActions from '../actions/account'
import * as NavigationActions from '../actions/navigation'

export class AccountsPagePresenter {
  constructor(props){
    this.props = props
  }
  loadData(){
    this.props.loadAccounts()
  }

  static mapStateToProps(state) {
    return {
      accounts: values(state.entities.accounts)
    }
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, AccountActions, NavigationActions), dispatch)
  }
}

export default present(AccountsPagePresenter)
