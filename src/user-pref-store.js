import {Store} from './flux';
import {USERNAME_UPDATE} from './user-actions';
import {FONT_SIZE_PREF_UPDATE} from './font-actions';

export class UserPrefStore extends Store {
    getInitialState() {
        return {
            userName: 'abfaafg',
            fontSize: 'small'
        };
    }

    onDispatch(action) {
        switch(action.type) {
            case USERNAME_UPDATE:
                this.State.userName = action.value;
                this.emitChange();
                break;
            case FONT_SIZE_PREF_UPDATE:
                this.fontSize = action.value;
                this.emitChange();
                break;
        }
    }

    getUserPreferences() {
        return {...this.State};
    }
}