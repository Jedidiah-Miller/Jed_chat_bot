import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Fab } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';


export default class InputBar extends Component {

  state = {
    text: ''
  }

  handleSubmit() {

    const { text } = this.state;
    // check if hte string is empty
    this.setState({text: ''});
    if (!text || /^\s*$/.test(text)) return
    this.props.cb(text);
  }

  handleChange(e) {
    const text = e.target.value.replace(/[\r\n\v]+/g, "")
    this.setState({text});
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {

    return (
      <div style={styles.inputFrame} >
        <TextField
          id="standard-multiline-flexible"
          multiline
          onChange={e => this.handleChange(e)}
          onKeyPress={e => this.handleKeyPress(e)}
          style={styles.textField}
          margin="normal"
          value={this.state.text}
          placeholder='type your message here...'
        />
        <Fab
          size='small'
          onClick={() => this.handleSubmit()}
          style={styles.button}
        >
          <SendRoundedIcon style={styles.buttonIcon} />
        </Fab>
      </div>
    );
  }
}


const styles = {
  inputFrame: {
    width: '95%',
    padding: '5px 10px',
    display: 'flex'
  },
  textField: {
    width: '90%',
    margin: '0 auto'
  },
  button: {
    backgroundColor: '#0084ff'
  },
  buttonIcon: {
    color: 'white'
  }
};