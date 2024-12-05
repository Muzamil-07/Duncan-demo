import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './lib/store/store.js'
import { Leva } from 'leva'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store()}>
      <App />
      <Leva />
    </Provider>
  </React.StrictMode>
)
