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
    if(this.validate(month,amount)){
    	this.props.addBudget({month, amount}, this.props.goBack)
    }
     
  }
  validate(month,amount){
  	
  	var reg = /^[1-9](\d{3})-(0\d{1}|1[0-2])$/;
    if(!amount || amount == 0 ){
    	alert("amount输入不能为空或为0");
    	return false;
    }else if(isNaN(Number(amount))){
    	alert("amount必须是数字");
    	return false;
    }else if(!month){
    	alert("month不能为空");
    	return false;
    } else if(!reg.test(month)){
    	alert("日期输入有误,参考格式:yyyy-mm");
    	return false;
    }
    return true;
    
  	
  	
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

