import { Observable } from 'rxjs'

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
  .do(console.log.bind(console, '🔔 store emits: '))

export const extendRx = () => {
  Observable.prototype.ofType = (...types) => {
    return this.filter(({type}) => {
      switch (types.length) {
        case 0: throw new Error('Must define at least one filter type!')
        case 1: return types[0] === type
        default: return types.indexOf(type) !== -1
      }
    })
  }
}