import React from 'react'
import { Scanner } from 'react-native-qrcode-scanner-wrapper'

const App = () => {
  return <Scanner 
    onRead={(data) => {
      console.log(data)
    }}
    headerTitle='Place the code inside the marker'
  />
}

export default App
