import { Observable, Subject } from 'rxjs'

/* 
  Redux stores are very Observable-like, so we can turn it into a real Observable with the from() operator. It's a very intelligent operator as it takes any observable-like objects and converts them into real ones. These include arrays, generators and objects that conform to the ES7 Observable specification, which Redux stores do to enough extent.

  Redux’s observable-like behavior is primitive compared to a real Observable. Internally, each state change. But each time the "next" callback is invoked, it’s only notifying observers of available data, not emitting it. Observers are required to explicitly call store.getState() in order to see the current state of the world. To amend this:

  - the .map(...) gets the latest value every time the store change.
  - the .publishBehavior(initialValue) multicasts the latest value to all subscribers.
  - the .refCount() makes the stream go live once the first observer subscribes.
 */

export const createStreamFromStore = store => Observable.from(store)
  .map(() => store.getState())
  .publishBehavior(store.getState())
  .refCount()
  .do(console.log.bind(console, '🔔 store changed: '))


/*
  - input$ is for emitting actions to the middlewares and the store.
  - .merge(...actions) merges all the resulting streams into a single output.
  - .publish() converts it into a hot stream.
  - .connect() prevents the stream from emitting before both subscribers are subscribed.
  - The 1st .subscribe() sends the output of the epics (combinedActions$) into the epics again, so that the newly formed actions (e.g. accountEpic, transactionLogEpic) can get handled by the middlewares.
  - The 2nd .subscribe() simultaneously sends all actions to the store as well, in case it can handle them.

  - Finally returns a proxied "dispatch" that feeds input$ with actions, so that the actions are sent to the middleware and gets the whole system start to work.
 */

export const createMiddleware = (store, epics) => {
  const input$ = new Subject()
  const actions = epics.map(_ => _(input$, store))
  const combinedActions$ = Observable.merge(...actions).publish()
  combinedActions$.subscribe(input$)
  combinedActions$.subscribe(action => store.dispatch(action))
  const sub = combinedActions$.connect()

  input$.subscribe({ error: err => console.warn(err) })

  return {
    dispatch: action => input$.next(action),
    unsubscribe: () => sub.unsubscribe()
  }
}

/*
  Extending the prototype of RxJS to filter a stream according to the "type" field of each value.
 */

export const extendRx = () => {
  Observable.prototype.ofType = function (...types) {
    return this.filter(({ type }) => {
      switch (types.length) {
        case 0: throw new Error('Must define at least one filter type!')
        case 1: return types[0] === type
        default: return types.indexOf(type) !== -1
      }
    })
  }
}