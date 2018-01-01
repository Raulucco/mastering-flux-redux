export class Store {
    constructor(dispatcher) {
        this.Listeners = [];
        this.State = this.getInitialState();
        dispatcher.register(this.onDispatch.bind(this));
    }

    onDispatch(action) {
        throw new Error('This method should be overriden');
    }

    getInitialState(action) {
        throw new Error('This method should be overriden');
    }

    addListener(listener) {
        this.Listeners.push(listener);
    }

    emitChange() {
        this.Listeners.forEach((listener) => listener(this.State));
    }
}