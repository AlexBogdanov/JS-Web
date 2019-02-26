import { registerUrl, loginUrl } from './../utils/constants';

const register = (user) => {
    return fetch(registerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
};

const login = (user) => {
    return fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });
};

export {
    register,
    login
};
