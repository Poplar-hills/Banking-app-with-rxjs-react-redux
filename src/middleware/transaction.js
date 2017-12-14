import R from 'ramda'

class Transaction {
  constructor (name, amount, balance, timestamp) {
    this.name = name
    this.amount = amount
    this.balance = balance
    this.timestamp = timestamp
  }
}

export const transactionMiddleware = (action$, store) => action$
  .ofType('WITHDRAW', 'DEPOSIT')  // intercept actions of types WITHDRAW and DEPOSIT
  .timestamp()
  .map(_ => R.merge(_.value, { timestamp: _.timestamp }))
  .map(action => {
    const { accounts } = store.getState()
    const balance = accounts[action.account] + action.amount
    return R.merge(action, { balance })
  })
  .map(_ => new Transaction(_.account, _.amount, _.balance, _.timestamp))
  .map(transaction => ({ type: 'ADD_TRANSACTION', transaction }))  // TODO: validate transaction
