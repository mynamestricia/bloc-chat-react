import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

 var config = {
    apiKey: "AIzaSyDHrUXRzGSi-ZVdZO578ZhnD6ELOcdxrrU",
    authDomain: "bloc-chat-react-c3719.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-c3719.firebaseio.com",
    projectId: "bloc-chat-react-c3719",
    storageBucket: "bloc-chat-react-c3719.appspot.com",
    messagingSenderId: "484693895730"
  };
  firebase.initializeApp(config);

class App extends Component {
constructor(props) {
  super(props)
  this.state = {
    activeRoom : '',
    user: ''
    };
  }

setActiveRoom(room) {
  this.setState({activeRoom: room})
}

setUser(user) {
  this.setState({user: user})
}
  
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}/>
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} />
         <User firebase={firebase} setUser={(user) => this.setUser(user)} user={this.state.user}/>
      </div>
    );
  }
}

export default App;