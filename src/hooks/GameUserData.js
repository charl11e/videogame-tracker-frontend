import {useState, useEffect} from 'react';
import * as api from '../api';

function useGameUserData() {
    
    // Setup useState hooks for selecting a user, and their games
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [games, setGames] = useState([]);

    // Get list of users
    useEffect(() => {
    api.fetchUsers().then(res => setUsers(res.data))
    .catch(err => console.error("Error fetching users:", err));
    }, []);

    // Get games for the selected user
    useEffect(() => {
    if (selectedUserId) {
        api.getGamesByUser(selectedUserId).then(res => setGames(res.data))
        .catch(err => console.error("Error fetching games for user:", err));
    } else {
        setGames([]);
    }
    }, [selectedUserId]);

    // Restore selected user from localstorage on initial load
    useEffect(() => {
    const savedUserId = localStorage.getItem('selectedUserId');
    if (savedUserId) {
        setSelectedUserId(savedUserId);
    }
    }, [])

    return {
        users,
        selectedUserId,
        games,
        setSelectedUserId,
        setGames,
        setUsers
    }
}

export default useGameUserData;