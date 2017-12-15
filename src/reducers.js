import R from 'ramda'
import actions from './actions'
import * as types from './constants'

// Utilities to make it easier to access certain values
const accountsLens = R.lensProp('accounts')
const messagesLens = R.lensProp('messages')
const resultsLens = R.lensProp('results')
const transactionsLens = R.lensProp('transactions')
const queryLens = R.lensProp('query')

const defaultState = {
  accounts: { checking: 0, savings: 0 },
  messages: [],
  results: [],
  transactions: [],
  skip: 0,
  limit: 10,
  query: ''
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.ADD_TRANSACTION:
      return R.over(transactionsLens, R.prepend(action.transaction), state)
    default:  // don't miss this
      return state
  }
}

export default reducer
