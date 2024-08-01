import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import {store} from '../src/store/store.js'
import {TestProvider} from './Context/Testing.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <TestProvider>
      <App/>
    </TestProvider>
  </Provider>
)
