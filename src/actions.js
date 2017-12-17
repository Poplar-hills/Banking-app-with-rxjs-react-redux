import * as types from './constants'

export const setAccount = value => ({
  type: types.ACCOUNT_CHANGED,
  value
})

export const setAmount = value => ({
  type: types.AMOUNT_CHANGED,
  value
})

export const transact = value => ({
  type: types.START_TRANSACTION,
  value
})

export const setBalances = balances => ({
  type: types.SET_BALANCES,
  balances
})