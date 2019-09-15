import React from 'react';
import { Container } from '@material-ui/core';
import ChatWindow from './ChatWindow/ChatWindow';


export default function AppContainer() {

  return (
    <Container
      maxWidth="lg"
      style={styles.container}
    >
      <ChatWindow />
    </Container>
  );
}


const styles = {
  container: {
    padding: '5% 1px',
    minWidth: '100%',
    minHeight: '100vh',
    // backgroundColor: 'rgb(168,177,184)'
  }
}