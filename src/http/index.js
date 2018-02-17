import {generate as id} from 'shortid';

export const get = (url, callback) => {
    setTimeout(() => {
        callback(id())
    }, 500);
};