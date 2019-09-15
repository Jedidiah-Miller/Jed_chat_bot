import React from 'react';
import './chatBubbles.css'; // it was way to annoying to do this in js


const MessageBubble = (props) => {

  const { message } = props;
  return (
    <li 
      className={[
        // add generic list styling
        message.uid === 'Jed' ? 'incoming' : 'outgoing'
      ]}
    >
      <span>{message.text}</span>
    </li>
  )
}

export default MessageBubble;