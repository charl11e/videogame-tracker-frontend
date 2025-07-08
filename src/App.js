import React, { useState, useEffect, useRef } from 'react';
import * as api from './api';

import EditGameModal from './components/EditGameModal';
import DeleteGameModal from './components/DeleteGameModal';
import UserSelector from './components/UserSelector';
import Games from './components/Games';

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

  // Setup hooks to manage deleting games
  const [deletingGame, setDeletingGame] = useState(null);

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
        setDeletingGame(null);
        setEditingGame(null);
        setEditedTitle('');
        setEditedPlatform('');
      }
    }

    function handleKeyOutsideModal(event) {
      if (event.key === 'Escape') {
        setDeletingGame(null);
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
      <UserSelector
      selectedUserId = {selectedUserId}
      setSelectedUserId = {setSelectedUserId}
      users = {users} >
      </UserSelector>

      {/* Display games for the selected user */}
      <h2>Games:</h2>
      <Games
      games = {games}
      selectedUserId = {selectedUserId}
      setOpenMenuId = {setOpenMenuId}
      openMenuId = {openMenuId}
      setEditingGame = {setEditingGame}
      setEditedTitle = {setEditedTitle}
      setEditedPlatform = {setEditedPlatform}
      menuRef = {menuRef}
      setDeletingGame = {setDeletingGame} >
      </Games>

      {/* Edit Game Modal */}
      {editingGame && (
        <EditGameModal
        modalRef = {modalRef}
        editedTitle = {editedTitle}
        setEditedTitle = {setEditedTitle}
        editedPlatform = {editedPlatform}
        setEditedPlatform = {setEditedPlatform}
        setEditingGame = {setEditingGame}
        editingGame = {editingGame}
        selectedUserId = {selectedUserId}
        setGames = {setGames} >
        </EditGameModal>
      )}
      

      {/* Delete Game Modal */}
      {deletingGame && (
        <DeleteGameModal
        deletingGame = {deletingGame}
        modalRef = {modalRef}
        setDeletingGame = {setDeletingGame}
        setGames = {setGames}
        selectedUserId = {selectedUserId} >
        </DeleteGameModal>
      )}

    </div>

  );
}

export default App;