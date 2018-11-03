import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './CraftFrame.scss';

/* AppFrame */

class AppFrame extends Component {
  constructor() {
    super();
    this.handleMessageReceived = this.handleMessageReceived.bind(this);
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCZP85JmQhLbQG9GFoUFqbHApONOkoGZ5M',
      authDomain: 'codecraftor-e8efe.firebaseapp.com',
      databaseURL: 'https://codecraftor-e8efe.firebaseio.com',
      projectId: 'codecraftor-e8efe',
      storageBucket: 'codecraftor-e8efe.appspot.com',
      messagingSenderId: '495590234980'
    });
  }

  componentDidMount() {
    window.addEventListener('message', this.handleMessageReceived);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMessageReceived);
  }

  handleMessageReceived(msg) {
    if (msg.orgin === process.env.REACT_APP_MAIN_FRAME_URL) {
      console.log('CW: msg received:', msg);
    }
  }

  render() {
    console.log('rendering CraftFrame');
    return <div id="container">CraftFrame</div>;
  }
}

export default AppFrame;
