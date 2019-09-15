import React, { Component } from 'react';
import { Paper } from '@material-ui/core';
import UserHeader from './UserHeader';
import MessageScrollView from './MessageScrollView/MessageScrollView';
import InputBar from './InputBar/InputBar';
import { _chat } from '../../services/Http'
import Message from '../../models/Message';
import { DivLine } from '../DividerLine';


export default class ChatWindow extends Component {

  state = {
    messages: []
  };

  handleSubmit(text) {

    const message = new Message('you', text);
    this.addMessage(message);

    _chat.create({message})
    .then(json => {
      this.addMessage(json.data.body.message);
    })
    .catch(error => this.handleError(error))
  }
  
  addMessage(message) {
    this.setState({
      messages: [...this.state.messages, message]
    }); 
  }
  
  handleError(error) {
    console.error('error - message: ', error)
  }

  render() {

    const { messages } = this.state;

    return (
      <Paper style={styles.container}>
        <UserHeader />
        <DivLine />
        <MessageScrollView messages={messages} />
        <DivLine />
        <InputBar cb={this.handleSubmit.bind(this)} />
      </Paper>
    );
  }
}


const styles = {
  container: {
    maxWidth: 600,
    maxHeight: '100vh',
    margin: 'auto'
  }
}