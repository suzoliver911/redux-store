export class Store {
  private subscribers: Function[];
  private reducers: { [key: string]: Function };
  private state: { [key: string]: any };

  constructor(reducers = {}, initialState = {}) {
    this.subscribers = [];
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  // to get the state reference store.value
  get value() {
    return this.state;
  }

  subscribe(fn) {
    this.subscribers = [...this.subscribers, fn];
    this.notify();
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== fn);
    };
  }

  dispatch(action) {
    this.state = this.reduce(this.state, action);
    this.notify();
  }

  private notify() {
    this.subscribers.forEach(fn => fn(this.value));
  }

  // each reducer manages its own piece of state
  private reduce(state, action) {
    const newState = {};
    for (const prop of Object.keys(this.reducers)) {
      // using prop we dynamically reference the following:
      // newState.todos = this.reducers.todos();
      newState[prop] = this.reducers[prop](state[prop], action);
    }
    return newState;
  }
}
