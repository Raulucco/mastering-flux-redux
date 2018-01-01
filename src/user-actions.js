export const USERNAME_UPDATE = 'USERNAME_UPDATE';

export function userNameUpdate(name) {
    return {
        type: USERNAME_UPDATE,
        value: name
    }
}