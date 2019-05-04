import React, { Component } from 'react'

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            username: '',
            content: '',
            sentAt: '',
            roomId: ''
        }
        this.messagesRef = this.props.database.database().ref('messages')
    }
    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
         const message = {
             value: snapshot.val(),
             key: snapshot.key
           };  
         this.setState({messages: this.state.messages.concat(message)})
        })
    }   
   
    render(){
      var activeRoom = this.props.activeRoom;
      var messageList = this.state.messages
        .filter(message => message.roomId === activeRoom)
        .map(message => {
          return <li className='messages' key={message.key}>{"From: " + message.username + " | Sent At: " + message.sentAt + " | Message: " + message.content}</li>
        })

        return(
        <div className='message-list'>{messageList}</div>
        );
    }
}
export default MessageList
