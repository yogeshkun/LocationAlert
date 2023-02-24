import { StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

class WebBrowser extends Component {
    onMessage(event) {
        const message = event.nativeEvent.data;
        console.log('Received message:', message);
        // parse the message string as a JSON object
        const consoleLog = JSON.parse(message);
        // handle the console value in the app logic
        console.log('Console value:', consoleLog.message);
      }
    render() {
        const url = 'https://yogeshkun.users.earthengine.app/view/sentinalcollection';
        return (
          <WebView
            source={{ uri: url }}
            onMessage={this.onMessage}
          />
        );
      }
  }

export default WebBrowser