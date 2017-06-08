import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {List, ListItem, makeSelectable} from 'material-ui'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import AccountIcon from 'material-ui/svg-icons/action/euro-symbol'
import { routerActions } from 'react-router-redux'

let SelectableList = makeSelectable(List)

@connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends React.Component {
  goTo(pathname){
    this.props.push(pathname)
  }
  render(){
    return (
      <SelectableList className={this.props.className} value={this.props.location.pathname} onChange={(event, value) => this.goTo(value)}>
        <ListItem value="/dashboard" primaryText="Dashboard" leftAvatar={<DashboardIcon />} />
        <ListItem value="/accounts" id="Accounts" primaryText="Accounts" leftAvatar={<AccountIcon />}/>
        <ListItem value="/budgets" id="Budgets" primaryText="Budgets" leftAvatar={<AccountIcon />}/>
      </SelectableList>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(routerActions, dispatch)
}

