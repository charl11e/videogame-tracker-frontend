import EditGameModal from './components/EditGameModal';
import DeleteGameModal from './components/DeleteGameModal';
import UserSelector from './components/UserSelector';
import Games from './components/Games';

import useGameUserData from './hooks/GameUserData';
import useModalMenu from './hooks/ModalMenu';

function App() {

  const { users, selectedUserId, games, setSelectedUserId, setGames } = useGameUserData();
  const { openMenuId, editingGame, editedTitle, editedPlatform, deletingGame, setOpenMenuId, setEditingGame, setEditedTitle, setEditedPlatform, setDeletingGame, modalRef, menuRef } = useModalMenu();

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