export class Dispatcher {
    constructor() {
        this.Listeners = [];
    }

    dispatch(action) {
        this.Listeners.forEach((listener) => listener(action));
    }

    register(listener) {
        this.Listeners.push(listener);
    }
}