export class Store {
  private subscribers: Function[];
  private reducers: {[key: string]: Function };
  private state: {[key: string]: any};

  constructor (reducers = {}, initialState = {}) {
    this.reducers = reducers;
    this.state = this.reduce(initialState, {});
  }

  // to get the state reference store.value
  get value() {
    return this.state;
  }


  dispatch(action) {
    this.state = this.reduce(this.state, action);
    console.log(this.state)
  }

  // each reducer manages its own piece of state
  private reduce(state, action) {
    const newState = {};
    for (const prop in this.reducers) {
      // using prop we dynamically reference the following:
      // newState.todos = this.reducers.todos();
      newState[prop] = this.reducers[prop](state[prop], action);

    }
    return newState;
  }

}
