import React from 'react';
import { connect } from 'react-redux';
import { RefreshIndicator } from 'material-ui';

const style = {
  container: {
    position: 'fixed',
    right: 100,
    bottom: 10,
    zIndex: 999999
  },
  refresh: {
    display: 'inline-block',
    position: 'relative'
  }
};

@connect(mapStateToProps)
export default class Indicator extends React.Component {
  render() {
    if (!this.props.open)
      return null;

    return (
      <div style={style.container}>
        <RefreshIndicator
          size={40}
          left={70}
          top={0}
          loadingColor={"#FF9800"}
          status="loading"
          style={style.refresh} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    open: state.indicator.open
  }
}
