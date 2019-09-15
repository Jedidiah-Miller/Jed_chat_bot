import React from 'react';


export default function UserHeader() {

  const imageUrl = 'https://avatars0.githubusercontent.com/u/38272517?s=460&v=4'

  return (
    <div style={styles.container}>
      <img
        src={imageUrl}
        alt='nope'
        style={styles.userImage}
      />
      <span style={styles.userName}>
        Chat Bot
      </span>
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    padding: '10px',
    // backgroundColor: 'rgb(118, 158, 203)'
  },
  userImage: {
    width: '50px',
    height: '50px',
    borderRadius: '50%'
  },
  userName: {
    fontWieght: 300,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    marginTop: 'auto',
    // position: 'fixed'
  }
}