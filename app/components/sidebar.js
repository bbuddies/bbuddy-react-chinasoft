import React, {Component, PropTypes} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import AccountIcon from 'material-ui/svg-icons/action/euro-symbol'

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          {...this.props}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

const ListExampleSelectable = (props) => (
    <SelectableList {...props} defaultValue={1} style={{}}>
      <ListItem value={1} primaryText="Dashboard" leftAvatar={<DashboardIcon />} />
      <ListItem value={2} primaryText="Accounts" leftAvatar={<AccountIcon />}/>
    </SelectableList>
);

export default ListExampleSelectable;
