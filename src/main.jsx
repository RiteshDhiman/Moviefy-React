import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from '../src/store/store.js'
import { FirebaseProvider } from './Context/Firebase.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <FirebaseProvider>
      <App/>
    </FirebaseProvider>
  </Provider>
)
