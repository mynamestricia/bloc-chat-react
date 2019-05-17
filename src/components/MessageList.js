import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [], username:"" ,content: "", sentAt: "", roomId: "" };
    this.messagesRef = this.props.database.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({messages: this.state.messages.concat( message ) });
    });
  }



render(){
        return(
        <div className='message-list'>
           {this.state.messages
           .filter(message => this.props.activeRoom.key === message.value.roomId)
           .map(message => { 
               return <li className='messages' key={message.key}>
                {message.value.username} : {message.value.content}
                </li> })
           }
           {console.log(this.props.activeRoom)}
           {console.log(this.state.messages)}
        </div>
        )
    }
}
export default MessageList