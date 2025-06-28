import React, { useState, useEffect, useRef, use } from 'react';
import * as api from './api';

// Main App component
function App() {

  // Setup useState hooks for selecting a user, and their games
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [games, setGames] = useState([]);

  // Setup hooks to manage game menus
  const [openMenuId, setOpenMenuId] = useState(null);

  // Setup hooks to manage editing games
  const [editingGame, setEditingGame] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedPlatform, setEditedPlatform] = useState('');

  // Event listener to close dropdown menu when clicking outside
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Event listener to close modal when clicking outside
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutsideModal(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setEditingGame(null);
        setEditedTitle('');
        setEditedPlatform('');
      }
    }

    function handleKeyOutsideModal(event) {
      if (event.key === 'Escape') {
        setEditingGame(null);
        setEditedTitle('');
        setEditedPlatform('');
      }
    }

    document.addEventListener('mousedown', handleClickOutsideModal);

    document.addEventListener('keydown', handleKeyOutsideModal);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideModal);
      document.removeEventListener('keydown', handleKeyOutsideModal);
    }
  }, [])

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
      <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {games.length === 0 && selectedUserId && <li>No games found for user</li>}
        {games.map (game => (
          <li key={game.id} className="bg-white rounded-xl shadow-lg flex items-center gap-4 p-4 w-72 min-h-28 relative group" style={{ alignItems: 'flex-start' }}>
            
            {/* Display game cover image */}
            <div className="w-16 h-20 bg-gray-200 rounded-md flex-shrink-0 flex items-center justify-center"></div>
            
            {/* Hover effect for managing game */}
            <button className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 hidden group-hover:block text-3xl" title="Manage game"
            onClick={(e) => {
              setOpenMenuId (openMenuId === game.id ? null : game.id)
            }}
            >⋮</button>

            {/* Dropdown menu for managing game */}
            {openMenuId === game.id && (
              <div ref={menuRef} className="absolute top-14 right-2 bg-white border rounded-md shadow-md z-10">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={(e) => {
                  setEditingGame(game);
                  setEditedTitle(game.title);
                  setEditedPlatform(game.platform);
                  setOpenMenuId(null);
                }}
                >Edit</button>
                <button className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">Delete</button>
              </div>
              )}

            {/* Game info */}
            <div className="pr-6">
              <p className="text-lg font-semibold text-gray-800 break-words hyphens-auto">{game.title}</p>
              <p className="text-sm text-gray-500">{game.platform}</p>
            </div>
          </li>
        ))}
      </ul>


        {/* Edit Game Modal */}
      {editingGame && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Edit Game</h3>

            <label className="block mb-2 text-xl font-semibold">
              Title:
              <input type="text" value={editedTitle} className="w-full p-2 border rounded mt-1 font-normal"
              onChange={(e) => setEditedTitle(e.target.value)}></input>
            </label>

            <label className="block mb-2 text-xl font-semibold">
              Platform:
              <input type="text" value={editedPlatform} className="w-full p-2 border rounded mt-1 font-normal"
              onChange={(e) => setEditedPlatform(e.target.value)}></input>
            </label>

            <div className="flex justify-end gap-2 mt-4">

              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-semibold"
              onClick={() => setEditingGame(null)}>Cancel</button>

              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
              onClick={async () => {
                await api.updateGame(editingGame.id, {
                  title: editedTitle,
                  platform: editedPlatform,
                  userID: selectedUserId
                });

                setEditingGame(null);
                const res = await api.getGamesByUser(selectedUserId);
                setGames(res.data);
              }}>Save</button>
            </div>


          </div>
        </div>

      )}
    </div>

  );
}

export default App;