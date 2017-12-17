import { merge } from 'ramda'
import * as types from '../constants'
import { setBalances } from '../actions'

class Transaction {
  constructor (name, amount, balance, timestamp) {
    this.name = name
    this.amount = amount
    this.balance = balance
    this.timestamp = timestamp
  }
}

const transactionSuccess = store => newBalances => setBalances(merge(
  store.getState()['accounts'],
  newBalances
))

export const transactionEpic = (action$, store) => action$
  .ofType(types.ADD_TRANSACTION)
  .pluck('transaction')
  .map(_ => transactionSuccess(store)({ [_.name]: _.balance }))

export const transactionLogEpic = (action$, store) => action$
  .ofType('WITHDRAW', 'DEPOSIT')  // intercept actions of types "WITHDRAW" and "DEPOSIT" (formed in accountEpic)
  .timestamp()
  .map(_ => merge(_.value, { timestamp: _.timestamp }))
  .map(action => {
    const { accounts } = store.getState()
    const balance = accounts[action.account] + action.amount
    return merge(action, { balance })
  })
  .map(_ => new Transaction(_.account, _.amount, _.balance, _.timestamp))
  .map(transaction => ({ type: types.ADD_TRANSACTION, transaction }))  // TODO: validate transaction (amount cannot be negative)
