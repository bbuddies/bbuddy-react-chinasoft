import React from 'react';

export default class Body extends React.Component {
  render() {
    return (
      <div {...this.props} style={{paddingTop: 75}}>
        {this.props.children}
      </div>
    );
  }
}
