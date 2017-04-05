import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'

export default class AccountsPage extends React.Component {
  add(){

  }
  render() {
    // let {accounts} = this.props
    let accounts = [{id: 1, name: "CMB", balance: 1999}, {id: 2, name: "CCB", balance: 100000}]
    return (
      <Card>
        <CardTitle title='Accounts'/>
        <CardText>
          <Table height='800px' fixedHeader={true} >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Balance">Balance</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} stripedRows={true}>
              {accounts.map(account => (
                <TableRow key={account.id}>
                  <TableRowColumn>{account.name}</TableRowColumn>
                  <TableRowColumn>{account.balance}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <RaisedButton
            label='Add'
            primary={true}
            onTouchTap={() => this.add()}/>
        </CardActions>
      </Card>
    )
  }
}
