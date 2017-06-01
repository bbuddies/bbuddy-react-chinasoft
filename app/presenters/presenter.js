import React from 'react'
import { connect } from 'react-redux'

export default Presenter => ComposedComponent => connect(Presenter.mapStateToProps, Presenter.mapDispatchToProps)(class extends React.Component {
  presenter = new Presenter(this.props)
  componentWillMount() {
    this.presenter.setState = (updater, callback) => this.setState(updater, callback)
    this.presenter.loadData && this.presenter.loadData()
  }
  componentWillReceiveProps(nextProps) {
    this.presenter.props = nextProps
  }
  render() {
    return(
      <ComposedComponent {...this.presenter.props} {...this.presenter.getProps && this.presenter.getProps()} {...this.state}/>
    )
  }
})
