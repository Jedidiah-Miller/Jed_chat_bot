import React, { Component } from 'react';
import MessageBubble from './MessageBubble';


export default class MessageScrollView extends Component {

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const { messages } = this.props;
  
    return (
      <ul id='messageList' style={styles.root} >
        {messages.map((message, i) => (
          <MessageBubble
            key={i}
            message={message}
          />
        ))}
        <div ref={el => this.messagesEnd = el} />
      </ul>
    );
  }
}

const styles = {
  root: {
    width: '100%',
    maxWidth: '100%',
    height: 400,
    maxHeight: 500,
    backgroundColor: 'inherit',
    position: 'relative',
    overflow: 'auto',
    paddingTop: '5px',
    margin: 0,
    listStyle: 'none'
  },
  incoming: {
    float: 'left',
    background: 'rgb(204, 204, 204)',
    marginLeft: '10px',
    borderBottomLeftRadius: '5px',
  },
  outgoing: {
    float: 'right',
    background: '#0084ff',
    marginRight: '10px',
    borderBottomRightRadius: '5px',
  }
};