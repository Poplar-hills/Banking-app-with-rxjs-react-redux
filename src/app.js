import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducers'
import { createMiddleware, createStreamFromStore, extendRx } from './utils'
import Banking from './components/Banking'
import epics from './epics'
import '../vendor/bootstrap-darkly.min.css'
import './styles/theme.styl'

extendRx()

const initialState = {
  accounts: { checking: 100, savings: 100 },
  transactions: [],
  messages: [],
  query: '',
  results: [],
  skip: 0,
  limit: 10
}
const store = createStore(reducer, initialState)
const middleware = createMiddleware(store, epics)
const state$ = createStreamFromStore(store)

ReactDOM.render(
  <Banking appState$={ state$ } dispatch={ middleware.dispatch } />, 
  document.getElementById('root')
)
