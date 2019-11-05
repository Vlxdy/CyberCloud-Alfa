import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from 'axios';

import Navigation from './components/Navigation';

import Terminals from './components/terminals/Terminals'

import Items from './components/items/Items'

import Adminitem from './components/items/Adminitem'

import Signup from './components/auth/Signup'

import Signin from './components/auth/Signin'

import Image from './components/items/Image'

import Buy from './components/items/Buy'

import Petitions from './components/petitions/Petitions'

import Rates from './components/rates/Rates'

import Settings from './components/settings/Settings'

import Configuration from './components/settings/Configuration'

import Users from './components/users/Users'

import ItemTerminal from './components/items/ItemTerminal'

import UserHistory from './components/history/UserHistory'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      token: "",
      money: 0
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  checkLoginStatus() {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(response => {
        if (
          response.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({
            loggedInStatus: "LOGGED_IN",
            user: response.data.user
          });
        } else if (
          !response.data.logged_in &
          (this.state.loggedInStatus === "LOGGED_IN")
        ) {
          this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {},
            token: ""
          });
        }
      })
      .catch(error => {
        console.log("check login error", error);
      });
  }
  componentDidMount() {
    //this.checkLoginStatus();
    if(localStorage.getItem('datos')===null)
    {
      console.log("funciona")
    }
    else
    {
      const tempo = JSON.parse(localStorage.getItem('datos'))
      this.setState({
        loggedInStatus: tempo.loggedInStatus,
        token: tempo.token,
        user: tempo.user
      })
      this.timer = setInterval(async() => {
        this.getUser();
      }, 2000);
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {},
      token: ""
    });
    localStorage.clear()
    clearInterval(this.timer);
  }
  getUser=async()=>{
    const user1 = await axios.get("http://localhost:4000/api/user/"+this.state.user._id);
    this.setState({
      user: user1.data
    })
  }
  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user,
      token: data.token
    });
    //console.log(this.state)
    localStorage.setItem('datos', JSON.stringify(this.state));
    this.timer = setInterval(async() => {
      this.getUser();
    }, 2000);
  }

  render() {
    return (
      <Router>
      <Navigation user={this.state.user} logged={this.state.loggedInStatus} handleLogout={this.handleLogout}/>
      <div className="container p-4">
        <Route
          path="/"
          exact
          render={props => (
            <Terminals
            {...props}
            user={this.state.user}
            token={this.state.token}
            />
          )}/>
        <Route
          path="/items"
          render={props => (
            <Items
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/history"
          render={props => (
            <UserHistory
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/itemterminal"
          render={props => (
            <ItemTerminal
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/configuration"
          render={props => (
            <Configuration
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/setting"
          render={props => (
            <Settings
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/users"
          render={props => (
            <Users
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/rates"
          render={props => (
            <Rates
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/adminitem"
          render={props => (
            <Adminitem
            {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
          )}/>
          <Route
          path="/image"
          render={props => (
            <Image
            {...props}
            logged={this.state.loggedInStatus}
            />
          )}/>
        <Route
          exact
          path="/signup"
          render={props => (
            <Signup
            {...props}
            />
          )}/>
        <Route
          exact
          path={"/signin"}
          render={props => (
          <Signin
           {...props} 
            handleLogin={this.handleLogin.bind(this)}
            handleLogout={this.handleLogout}
            logged={this.state.loggedInStatus}
            />
            )}
          />
          <Route
          exact
          path={"/buy"}
          render={props => (
          <Buy
           {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
            )}
          />
          <Route
          exact
          path={"/petitions"}
          render={props => (
          <Petitions
           {...props}
            logged={this.state.loggedInStatus}
            user={this.state.user}
            />
            )}
          />
      </div>
    </Router>
    );
  }
}

export default App;
