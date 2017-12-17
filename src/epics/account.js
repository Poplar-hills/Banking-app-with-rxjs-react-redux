import { pipe, prop } from 'ramda'
import * as types from '../constants'

const accountEpic = action$ => {
  const amount$ = action$
    .ofType(types.AMOUNT_CHANGED)
    .map(pipe(prop('value'), Number))

  const account$ = action$
    .ofType(types.ACCOUNT_CHANGED)
    .pluck('value')

  return action$
    .ofType(types.START_TRANSACTION)
    .pluck('value')
    .withLatestFrom(
      amount$, account$,
      (transactionType, amount, account) => ({
        type: transactionType,  // form a new action of type 'WITHDRAW' or 'DEPOSIT'
        amount: amount * (transactionType === 'DEPOSIT' ? 1 : -1),
        account        
      })
    )
    .do(console.log)
}

export default accountEpic
