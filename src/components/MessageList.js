import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [], 
      username:" ",
      content: " ",
      sentAt: " ",
      roomId: " " 
    };
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = { value : snapshot.val(), 
        key : snapshot.key}; 
      this.setState({messages: this.state.messages.concat( message ) });
    });
  }


handleChange(e) {
        this.setState({ content: e.target.value })
    }
    
createMessage(e) {
        this.messagesRef.push ({
            content: this.state.content,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            roomId: this.props.activeRoom.key,
            username: this.props.user ? this.props.user.displayName : "Guest"
        });
        this.setState({ content: ''});
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

           <form className='new-message' onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.setState({ content: e.target.value })) } } >
                <input type='text'  onChange={(e) => this.handleChange(e)} />
                <input type='submit' value='Submit Message' />
            </form>

        </div>
        )
    }
}
export default MessageList