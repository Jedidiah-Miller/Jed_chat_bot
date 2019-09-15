import React from 'react';
import AppContainer from './Container';
import './App.css'; // disable scroll is here

export default function App() {
  return (
    <div style={styles.root}>
      <AppContainer />
    </div>
  )
}

const styles = {
  root: {
    backgroundColor: 'rgb(168,177,184)'
  }
}