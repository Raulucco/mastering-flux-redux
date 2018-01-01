import {Dispatcher} from './flux';
import {UserPrefStore} from './user-pref-store';
import {updateUserName} from './user-actions';
import {fontSizePrefUpdate} from './user-pref-store';

const dispatcher = new Dispatcher();
const userPref  = new UserPrefStore(dispatcher);

const userNameInput = document.getElementById('userNameInput');
const fontSizeRadioBtns = document.forms.fontSizeForm.formSize;

function render({userName, fontSize}) {
    document.getElementById('userName').innerText = userName;
    document.getElementsByClassName('container')[0].style.fontSize = fontSize;
    fontSizeRadioBtns.value = fontSize;
}

userPref.addListener(render);

userNameInput.addEventListener('input', ({target}) => {
    const name = target.value;
    dispatcher.dispatch(updateUserName(name));
});

fontSizeRadioBtns.forEach((element) => {
    element.addEventListener('change', () => {
        dispatcher.dispatch(fontSizePrefUpdate(element.value));
    });
});

dispatcher.register((state) => {
    render(state);
    localStorage['preferences'] = JSON.stringify(state);
});

render(userPref.getUserPreferences());