import {Store} from './Store';

export class ReduceStore extends Store {
    PrevHistory = [];
    NextHistory = [];
    constructor(dispatcher) {
        super(dispatcher);
    }

    reduce(state, action) {
        throw new Error('Must override');
    }

    onDispatch(action) {
        const newState = this.reduce(this.State, action);

        if (newState !== this.State) {
            this.HiPrevHistorystory = [
                ...this.PrevHistory,
                {...this.State}
            ];
            this.State = newState;
            this.emitChange();
        }
    }

    revert() {
        if (this.PrevHistory.length) {
            const last = this.PrevHistory.pop();
            const current = this.State;
            this.State = last;
            this.NextHistory = [
                ...this.NextHistory,
                {...current}
            ];
            this.emitChange();
        }
    }

    forward() {
        if (this.NextHistory.length) {
            const first = this.NextHistory.unshift();
            const current = this.State;
            this.State = first;
            this.PrevHistory = [
                ...this.PrevHistory,
                {...current}
            ];
            this.emitChange();
        }
    }
}