import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers'
import { createStreamFromStore, extendRx } from './utils'
import Banking from './components/Banking'
import '../vendor/bootstrap-darkly.min.css'
import './styles/theme.styl'

extendRx()

const initialState = {
  accounts: { checking: 100, savings: 100 },
  transactions: [
    { timestamp: 1413161883026, amount: 500, name: 'Startup funding', balance: 500 }
  ],
  messages: [],
  query: '',
  results: [],
  skip: 0,
  limit: 10
}
const store = createStore(reducer, initialState)
const state$ = createStreamFromStore(store)

ReactDOM.render(
  <Banking appState$={ state$ } dispatch={ store.dispatch } />, 
  document.getElementById('root')
)
