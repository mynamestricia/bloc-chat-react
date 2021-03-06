import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms:[],
            newRoomName: ''
        };

        this.roomsRef = this.props.firebase.database().ref('rooms');
    }
    componentDidMount(){
        this.roomsRef.on('child_added', snapshot => {
            const room = {value: snapshot.val(),
            key: snapshot.key};
           this.setState({ rooms: this.state.rooms.concat(room) })
        })
    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
    }


    createRoom(e) {
        this.roomsRef.push ({
            name: this.state.newRoomName
        });
        this.setState({ newRoomName: ''});
    }

    setActiveRoom(room) {
        this.props.setActiveRoom(room);
    }

 
        render () {
          return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map(room => 
                    <li className='rooms-list' key={room.key} onClick={() => this.props.setActiveRoom(room)}> {room.value.name}</li>
                    )
                }
                </ul>
            <form className='new-room' onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoomName) } } >
                <input type='text' value={this.state.newRoomName} name='room-name' onChange={(e) => this.handleChange(e)} />
                <input type='submit' value='Submit Room' />
            </form>
            </div>
    )
    }
}
export default RoomList;