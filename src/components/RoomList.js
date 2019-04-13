import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rooms:[],
        }
        this.roomsRef = this.props.database.database().ref('rooms');
    }
    componentDidMount(){
        this.roomsRef.on('child_added', snapshot => {
            const room = {value : snapshot.val(),
            key : snapshot.key};
           this.setState({rooms: this.state.rooms.concat(room)})
        })
    }

    handleChange(e) {
    	this.setState({ newRoomName: e.target.value })
    }


    createRoom(e) {
    	e.preventDefault();
    	this.roomsRef.push ({
    		name: this.state.newRoomName
    	});
    }

 
    render () {
        return (
            <div className='rooms-list'>
                <ul>
                    {this.state.rooms.map( (data) => 
                    <li className='roomNumber' key={data.key}>{data.value.name}</li>)}
                </ul>
            <form className = 'newRoom' onSubmit = {(e) => this.createRoom(e)}>
              <input type = 'text' value = { this.state.roomName } name = 'roomName' onChange= {(e) => this.handleChange(e)}/>
              <input type = 'submit' value = 'Create New Room' />
            </form>
            </div>
    )
    }               
}
export default RoomList;