/**
* @description:
* @author
* @date 2023-02-24 23:34:09
* @version 1.0 
*
* Change Logs:
* Date           Author       Notes
*
*/ 
import React from 'react';
// import Maps from './src/Maps';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import HomePage from './components/HomePage';
// import WebBrowser from './src/WebBrowser'




function App() {
  return (
    <>
    
      <HomePage />
      {/* <WebBrowser /> */}
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

// export default withAuthenticator(App)
export default App
