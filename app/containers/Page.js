import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import EventListener from 'react-event-listener'
import Notification from '../containers/Notification'
import Indicator from '../containers/Indicator'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import Body from '../components/body'
import Footer from '../components/footer'
import * as CommonActions from '../actions/common'

import '../../sass/page.scss'

@connect(mapStateToProps, mapDispatchToProps)
export default class Page extends React.Component {
  componentDidMount() {
    this.updateDeviceSize();
  }

  updateDeviceSize() {
    const width = window.innerWidth;
    this.props.resizeDevice(width);
  }

  render() {
    const {pageStyle: {muiTheme}} = this.props
    return (
      <EventListener target="window" onResize={this.updateDeviceSize.bind(this)}>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            <Header />
            <div className="main">
              <Sidebar location={this.props.location} className="sidebar" />
              <div className="body">
                <Body>
                {this.props.children}
                </Body>
                <Footer />
              </div>
            </div>
            <Notification />
            <Indicator />
          </div>
        </MuiThemeProvider>
      </EventListener>
    );
  }
};

function mapStateToProps(state) {
  return {
    pageStyle: state.pageStyle
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CommonActions, dispatch)
}
