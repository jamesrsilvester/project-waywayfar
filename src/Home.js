import React, { Component } from 'react'
import BodyContainer from './body/BodyContainer.js'
import Header from './head/Header.js'
import $ from 'jquery-ajax'
import './Home.css'
let domainName = process.env.DOMAIN_NAME || 'http://localhost:3001'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      userId: '',
      isLoggedIn: false
    }
  }

  handleUserNameChange (event) {
    this.setState({userName: event.target.value})
  }

  handlePasswordChange (event) {
    this.setState({password: event.target.value})
  }

  handleSubmit (event) {
    event.preventDefault()
    $.ajax({
      method: 'POST',
      url: domainName + '/login',
      data: {
        username: this.state.userName,
        password: this.state.password
      }
    })
    .then((res) => {
      console.log(res, 'User is authenticated')
      this.setState({userId: res._id, isLoggedIn: true})
      alert('User is truly authentic!')
    },
    (err) => {
      alert('Your Credentials Are Incorrect')
      this.setState({
        userName: '',
        password: '',
        userId: '',
        isLoggedIn: false
      })
    })
  }

  render () {
    return (
      <div className='home'>
        <Header handleUserNameChange={(event) => this.handleUserNameChange(event)} handlePasswordChange={(event) => this.handlePasswordChange(event)} handleSubmit={(event) => this.handleSubmit(event)} userId={this.state.userId} isLoggedIn={this.state.isLoggedIn} />
        <BodyContainer userId={this.state.userId} isLoggedIn={this.state.isLoggedIn} />
        <div className='col m12' id='banner'>
          <h8 id='copyright'>Copyright (c) 2017 Copyright Holder All Rights Reserved.</h8>
        </div>
      </div>
    )
  }
}

export default Home
