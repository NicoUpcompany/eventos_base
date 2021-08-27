import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import SingUp from './pages/SingUp/SingUp';
import Login from './pages/Auth/Login/Login';
import WaitingRoom from './pages/WaitingRoom/Waitingroom';
// import StreamingScreen from './pages/Streaming/Streaming';
import Confirm from './pages/Confirmacion/Confirmacion';
import DashboardSignIn from './pages/AdminDashboard/Auth/Login';
import Dashboard from './pages/AdminDashboard/Dashboard/Dashboard';
// import VideoChatApp from './components/VideoChatApp/App/App';

import * as actions from './store/action';
import { wrapperStyle } from "./style";

const history = createBrowserHistory();

class App extends React.Component {
    state = {
        isLoggedin: false
    }

    componentDidMount() {
        this.props.getLoggedinUser();
    }

    render() {

        return (
            <div css={wrapperStyle()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path="/iniciarsesion" component={ Login } />
                        <Route exact path="/streaming" component={ WaitingRoom } />
                        <Route exact path="/registro" component={ SingUp } />
                        {/* <Route exact path="/streaming" component={ StreamingScreen } /> */}
                        {/* <Route path="/videollamada" component={ VideoChatApp } /> */}
                        <Route exact path="/confirmacion" component={ Confirm } />
                        <Route exact path="/" component={ Login } />

                        <Route exact path="/dashboard" component={ DashboardSignIn } />
                        <Route path="/dashboard/admin" component={ Dashboard } />

                        <Redirect to="/" />
                    </Switch>
                </Router>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getLoggedinUser: () => dispatch(actions.authCheckState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);