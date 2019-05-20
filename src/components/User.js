import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
  	this.props.firebase.auth().onAuthStateChanged((user) => {
  		user ? this.props.setUser(user) : this.props.setUser('Guest')
  	})
  }

  signIn() {
  	const provider = new this.props.firebase.auth.GoogleAuthProvider();
  	this.props.firebase.auth().signInWithPopup( provider );
  }
  signOut() {
  	this.props.firebase.auth().signOut();
  }

  render() {
  	   return(
            <section className='user'>
                <div className='userName'>{this.props.user === null ? 'Guest' : this.props.user.displayName}</div>
                <button className='sign-in' onClick={() => this.signIn()}>
                    <span>Sign In</span>
                </button>
                <button className='sign-out' onClick={() => this.signOut()}>
                    <span>Sign Out</span>
                </button>
            </section>
        )
    }
}
export default User