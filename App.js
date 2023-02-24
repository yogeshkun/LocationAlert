import { View, Text } from 'react-native'
import React from 'react'

import { withAuthenticator } from 'aws-amplify-react-native'

import Apps from './src/App'
const App = () => {
  return (
    <><Apps/></>
  )
}

export default withAuthenticator(App)