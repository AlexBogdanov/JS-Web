const baseUrl = 'http://localhost:9999';
const registerUrl = `${baseUrl}/auth/signup`;
const loginUrl = `${baseUrl}/auth/signin`;
const getGamesUrl = `${baseUrl}/feed/games`;
const createGameUrl = `${baseUrl}/feed/game/create`;

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

const getGames = () => {
    return fetch(getGamesUrl);
}

const createGame = (game) => {
    return fetch(createGameUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(game)
    });
};

export {
    register,
    login,
    getGames,
    createGame
}