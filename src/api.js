import axios from 'axios';

const API = axios.create( {
    baseURL: 'http://localhost:8080/api'
})

export const fetchUsers = () => API.get('/users');
export const addUser = (user) => API.post('/users', user);
export const delUser = (id) => API.delete('/users/' + id);
export const updateUser = (id, user) => API.put('/users/' + id, user);
export const getGamesByUser = (id) => API.get('/users/' + id + '/games');

export const fetchGames = () => API.get('/games');
export const addGame = (game) => API.post('/games', game);
export const delGame = (id) => API.delete('/games/' + id);
export const updateGame = (id, game) => API.put('/games/' + id, game);

// TODO: add api error handling