import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CometChat } from "@cometchat-pro/chat"
import { COMETCHAT_CONSTANTS } from './consts';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import 'antd/dist/antd.css';
import './App.css';
import './ReApp.css';

// import './effects.css';

import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import App from './App';

const store = createStore(reducer, compose(
  	applyMiddleware(thunk)
));

const appID = COMETCHAT_CONSTANTS.APP_ID;
const region = COMETCHAT_CONSTANTS.REGION;

const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(() => {

    if(CometChat.setSource) {
      	CometChat.setSource("ui-kit", "web", "reactjs");
    }
    console.log("Initialization completed successfully");
    ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
    , document.getElementById('root'));
	},
	error => {
		console.log("Initialization failed with error:", error);
	}
);

serviceWorker.unregister();
