import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, TextField} from 'material-ui'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import merge from 'lodash/merge'
import * as NavigationActions from '../actions/navigation'
import * as BudgetActions from '../actions/budget'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch) => bindActionCreators(merge({}, BudgetActions, NavigationActions), dispatch)

@connect(mapStateToProps, mapDispatchToProps)
export default class AddBudgetPage extends React.Component {
  save(){
    const month = this.refs.month.getValue()
    const amount = this.refs.amount.getValue()
    var reg = /((((19|20)\d{2})-(0?(1|[3-9])|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/g;
    if(!amount){
    	alert("输入不能为空");
    	return;
    }else if(isNaN(Number(amount))){
    	alert("amount必须为数字");
    	return;
    }else if(!reg.test(month)){
    	alert("日期输入有误,参考格式:yyyy-mm-dd");
    	return;
    }else{
    	this.props.addBudget({month, amount}, this.props.goBack)
    }
    
    
  }
  render() {
    const {goBack} = this.props
    return (
      <Card>
        <CardTitle title='Add Budget'/>
        <CardText>
          <TextField fullWidth={true} id="month" ref="month" hintText="Month" floatingLabelText="Month" autoFocus />
          <TextField fullWidth={true} id="amount" ref="amount" hintText="Amount" floatingLabelText="Amount" />
        </CardText>
        <CardActions>
          <RaisedButton
            label='Save'
            primary={true}
            onTouchTap={() => this.save()}/>
        </CardActions>
      </Card>
    )
  }
}

