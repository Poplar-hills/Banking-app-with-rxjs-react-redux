import accountEpic from './account'
import { transactionEpic, transactionLogEpic } from './transaction'
import loggingEpic from './logging'

export default [
  accountEpic,
  transactionEpic,
  transactionLogEpic,
  loggingEpic()
]
