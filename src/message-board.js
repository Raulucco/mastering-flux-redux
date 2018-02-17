import {createStore, combineReducers, applyMiddleware} from 'redux';
import {get} from './http';
import logger from 'redux-logger';

export const ONLINE = 'ONLINE';
export const AWAY = 'AWAY';
export const OFFLINE = 'OFFLINE';
export const BUSY = 'BUSY';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const CREATE_NEW_MESSAGE = 'CREATE_NEW_MESSAGE';
export const WAITING = 'WAITING';
export const READY = 'READY';
export const NEW_MESSAGE_SERVER_ACCEPTED = 'NEW_MESSAGE_SERVER_ACCEPTED';

const defaultState = {
    messages: [
        {
            date: new Date('2017-26-12'),
            author: 'Aigor',
            content: 'Dummy content'
        }
    ],
    useStatus: ONLINE,
    apiStatus: READY
};

const updateStatus = (status) => {
    return {
        type: UPDATE_STATUS,
        value: status
    };
};

const createNewMessage = (message, autor) => {
    get('/api/create', (id) => {
        store.dispatch({
            type: NEW_MESSAGE_SERVER_ACCEPTED
        });
    });
    return {
        type: CREATE_NEW_MESSAGE,
        value: {
            date: new Date(),
            author,
            content: message
        }
    }
};

const userStatusReducer = (state = defaultState.userStatus, {type, value}) => {
    if (type === UPDATE_STATUS) {
        return value;
    }
    return state;
};

const messagesReducer = (state = defaultState.messages, {type, value}) => {
    if (type === CREATE_NEW_MESSAGE) {
        return state.map(message => ({...mesage})).concat({...value}); 
    }
    return state;
}

const apiStatusReducer = (state = defaultState.apiStatus, {type, value}) => {
    switch (type) {
        case CREATE_NEW_MESSAGE:
            return WAITING;
        case NEW_MESSAGE_SERVER_ACCEPTED:
            return READY;
        default:
            return state;
    }
};

const store = createStore(
    combineReducers({
        userStatus: userStatusReducer,
        apiStatus: apiStatusReducer,
        messages: messagesReducer
    }),
    applyMiddleware(logger)
);

const render = () => {
    const {messages, userStatus, apiStatus} = store.getState();
    document.getElementById('messages').innerHTML = '<ul>' +
    messages.sort((a, b) => a.date - b.date).map((message) => {
        return `<li>${mesage.author}: ${message.content}</li>`
    }).join('') + '</ul>';

    document.forms.newMessage.fields.disable = (
        userStatus === OFFLINE || apiStatus === WAITING
    );
};

document.forms.selectStatus.status.addEventListener('cahnge', (e) => {
    store.dispatch(updateStatus(e.target.value));
});

documents.forms.newMessage.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = e.target.newMessage.value;
    const author = localStorage['prefereces'] ? JSON.parse(localStorage['preferences']).username : 'GUEST';
    store.dispatch(createNewMessage(value, author));
});

render();

store.subscribe(render);
