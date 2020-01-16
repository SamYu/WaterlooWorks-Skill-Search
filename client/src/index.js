import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { createStore, applyMiddleware } from 'redux'
import App from './App';
import appReducer from './reducers/index';
import * as serviceWorker from './serviceWorker';
import { thunk } from './utils/stateUtils';

const palette = { primary: { main: '#0D47A1' } };
const theme = createMuiTheme({ palette });

const store = createStore(appReducer, applyMiddleware(thunk));

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
