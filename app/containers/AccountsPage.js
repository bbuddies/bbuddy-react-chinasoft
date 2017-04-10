import React from 'react';
import {Card, CardTitle, CardText, CardActions, RaisedButton, Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn} from 'material-ui'
import present from '../presenters/accountsPagePresenter'

@present
export default class AccountsPage extends React.Component {
  render() {
    const {accounts} = this.props
    const {goToAddAccount} = this.props
    return (
      <Card>
        <CardTitle title='Accounts'/>
        <CardText>
          <Table height='500px' fixedHeader={true} >
            <TableHeader>
              <TableRow>
                <TableHeaderColumn tooltip="Name">Name</TableHeaderColumn>
                <TableHeaderColumn tooltip="Balance">Balance</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody showRowHover={true} stripedRows={true}>
              {accounts.map((account, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{account.name}</TableRowColumn>
                  <TableRowColumn>{account.balance}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardText>
        <CardActions>
          <RaisedButton label='Add' primary={true} onTouchTap={goToAddAccount}/>
        </CardActions>
      </Card>
    )
  }
}

