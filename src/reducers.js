import { lensProp, over, prepend, merge, view, set } from 'ramda'
import actions from './actions'
import * as types from './constants'

// Utilities to make it easier to access certain values
const accountsLens = lensProp('accounts')
const transactionsLens = lensProp('transactions')

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
      return over(transactionsLens, prepend(action.transaction), state)

    case types.SET_BALANCES:
      const newAccountState = merge(view(accountsLens, state), action.balances)
      return set(accountsLens, newAccountState, state)

    default:  // don't miss this
      return state
  }
}

export default reducer
