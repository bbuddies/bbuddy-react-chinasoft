import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import {fetchToken} from './api/token'

injectTapEventPlugin();

let token = fetchToken()
const store = configureStore({authentication: {isAuthenticated: !!token.client}})
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store}/>
    </AppContainer>,
    document.getElementById('app'));
}
render(Root)
if (module.hot) module.hot.accept('./containers/Root', () => render(Root));

