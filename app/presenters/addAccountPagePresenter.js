import present from './presenter'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as AccountActions from '../actions/account'
import * as NavigationActions from '../actions/navigation'

export class AddAccountPagePresenter {
  constructor(props){
    this.props = props
  }
  getProps(){
    return {
      addAccount: account => this.addAccount(account)
    }
  }
  addAccount(account){
    this.props.addAccount(account, () => {this.props.goBack()})
  }

  static mapStateToProps(state) {
    return {}
  }

  static mapDispatchToProps(dispatch) {
    return bindActionCreators(merge({}, AccountActions, NavigationActions), dispatch)
  }
}

export default present(AddAccountPagePresenter)
