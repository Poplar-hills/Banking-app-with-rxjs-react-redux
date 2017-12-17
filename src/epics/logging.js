/*
  All actions flow through this epic as it does not filter out actions by using .ofType() like other epics.
 */

const loggingEpic = (console = window.console) => action$ => action$
  .do(
    action => console.log(`🔆 Dispatching action`, action),
    err => console.error(err)
  )
  .ignoreElements()

export default loggingEpic
