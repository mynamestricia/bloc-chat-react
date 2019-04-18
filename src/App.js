import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
constructor(props){
  super(props)
  this.state = {
    activeRoom : ''
  }
}
setActiveRoom(room){
  this.setState({activeRoom: room})
}
  render() {
    return (
      <div className="App">
        <RoomList database={firebase} activeRoom={this.state.activeRoom} setActiveRoom={(room) => this.setActiveRoom(room)}/>
        <MessageList database={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
