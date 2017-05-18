import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root';
import configureStore from './store/configureStore';

injectTapEventPlugin();

const defaultAuthentication = {isAuthenticated: false, token: {}, user: {}}
let loadAuthentication = () => {
  try {
    const serializedToken = localStorage.getItem('token');
    if (serializedToken === null) {
      return defaultAuthentication
    }
    let token = JSON.parse(serializedToken)
    return {isAuthenticated: !!token, token}
  } catch (err) {
    return defaultAuthentication
  }
}

const store = configureStore({authentication: loadAuthentication()})
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store}/>
    </AppContainer>,
    document.getElementById('app'));
}
render(Root)
if (module.hot) module.hot.accept('./containers/Root', () => render(Root));

