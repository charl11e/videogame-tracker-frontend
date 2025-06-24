import React, { useState, useEffect } from 'react';
import * as api from './api';

// Main App component
function App() {

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

  return (
    <div className="min-h-screen bg-neutral-100 p-4 gap-4 items-center flex flex-col">

      <h1 className="text-4xl font-bold">Game Library</h1>

      {/* Selector for picking a user */}
      <div className="w-full flex justify-end">
        <label htmlFor="user-select">Select User: </label>
        <select id="user-select" value={selectedUserId}
        onChange={(e) => {
          const id = e.target.value;
          setSelectedUserId(id);
          localStorage.setItem('selectedUserId', id);
        }}>
          
          <option value="">-- Choose a user --</option>
          {users.map(user => (
            <option key={user.id} value ={user.id}>{user.username}</option>
          ))}
        </select>
      </div>

      {/* Display games for the selected user */}
      <h2>Games:</h2>
      <ul className='mt-6 grid gtid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {games.length === 0 && selectedUserId && <li>No games found for user</li>}
        {games.map (game => (
          <li key={game.id} className="bg-white rounded-xl shadow-lg flex items-center gap-4 p-4">

            {/* Display game cover image */}
            <div className="w-16 h-20 bg-gray-200 rounded-md mb-4"></div>

            {/* Game info */}
            <div>
              <p className="text-lg font-semibold text-gray-800">{game.title}</p>
              <p className="text-sm text-gray-500">{game.platform}</p>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;