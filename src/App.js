import EditGameModal from './components/EditGameModal';
import DeleteGameModal from './components/DeleteGameModal';
import ProgressModal from './components/ProgressModal';
import UserSelector from './components/UserSelector';
import Games from './components/Games';
import AddUserModal from './components/AddUserModal';
import AddGameModal from './components/AddGameModal';

import useGameUserData from './hooks/GameUserData';
import useModalMenu from './hooks/EditModalMenu';
import useAddModal from './hooks/AddModalMenu';
import AddButton from './components/AddButton';
import SettingsButton from './components/SettingsButton';
import useSettingsModal from './hooks/SettingsModalMenu';
import SettingsModal from './components/SettingsModal';

function App() {

  const { users, selectedUserId, games, setSelectedUserId, setGames, setUsers } = useGameUserData();
  const { openMenuId, editingGame, editedTitle, editedPlatform, deletingGame, setOpenMenuId, setEditingGame, setEditedTitle, setEditedPlatform, setDeletingGame, modalRef, menuRef, updatingGame, setUpdatingGame, updatedProgress, setUpdatedProgress, updatedStatus, setUpdatedStatus, editedGameCover, setEditedGameCover } = useModalMenu();
  const { showAddGameModal, setShowAddGameModal, newGameTitle, setNewGameTitle, newGamePlatform, setNewGamePlatform, newGameProgress, setNewGameProgress, newGameStatus, setNewGameStatus, showAddUserModal, setShowAddUserModal, newUsername, setNewUsername, addModalRef} = useAddModal();
  const { showSettingsModal, setShowSettingsModal, settingsModalRef } = useSettingsModal();

  return (
    <div className="min-h-screen bg-neutral-100 p-4 gap-4 items-center flex flex-col">

      <h1 className="text-4xl font-bold">Game Library</h1>

      {/* Selector for picking a user */}
      <div className="flex justify-end items-center gap-4 w-full px-4">
        <UserSelector
        selectedUserId = {selectedUserId}
        setSelectedUserId = {setSelectedUserId}
        users = {users} >
        </UserSelector>
        <AddButton
          setShowAddGameModal = {setShowAddGameModal}
          setShowAddUserModal = {setShowAddUserModal} >
        </AddButton>
        <SettingsButton
        setShowSettingsModal = {setShowSettingsModal}>
        </SettingsButton>
      </div>

      {/* Display games for the selected user */}
      <Games
      games = {games}
      selectedUserId = {selectedUserId}
      setOpenMenuId = {setOpenMenuId}
      openMenuId = {openMenuId}
      setEditingGame = {setEditingGame}
      setEditedTitle = {setEditedTitle}
      setEditedPlatform = {setEditedPlatform}
      menuRef = {menuRef}
      setDeletingGame = {setDeletingGame}
      setUpdatingGame = {setUpdatingGame}
      setUpdatedProgress = {setUpdatedProgress}
      setUpdatedStatus = {setUpdatedStatus} >
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
        setGames = {setGames}
        editedGameCover = {editedGameCover}
        setEditedGameCover = {setEditedGameCover} >
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

      {/* Update progress Modal */}
      {updatingGame && (
        <ProgressModal
        modalRef = {modalRef}
        setUpdatingGame = {setUpdatingGame}
        updatingGame = {updatingGame}
        selectedUserId = {selectedUserId}
        updatedProgress = {updatedProgress}
        updatedStatus = {updatedStatus}
        setGames = {setGames}
        setUpdatedProgress = {setUpdatedProgress}
        setUpdatedStatus = {setUpdatedStatus} >
        </ProgressModal>
      )}

      {/* Add user modal */}
      {showAddUserModal && (
        <AddUserModal
        showAddUserModal = {showAddUserModal}
        addModalRef = {addModalRef}
        newUsername = {newUsername}
        setNewUsername = {setNewUsername}
        setShowAddUserModal = {setShowAddUserModal}
        setUsers = {setUsers} >
        </AddUserModal>
      )}

      {/* Add game modal */}
      {showAddGameModal && (
        <AddGameModal
        showAddGameModal = {showAddGameModal}
        addModalRef = {addModalRef}
        setShowAddGameModal = {setShowAddGameModal}
        selectedUserId = {selectedUserId}
        setGames = {setGames}
        setNewGameTitle = {setNewGameTitle}
        newGameTitle = {newGameTitle}
        newGamePlatform = {newGamePlatform}
        setNewGamePlatform = {setNewGamePlatform}
        newGameProgress = {newGameProgress}
        setNewGameProgress = {setNewGameProgress}
        newGameStatus = {newGameStatus}
        setNewGameStatus = {setNewGameStatus} >
        </AddGameModal>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal
          showSettingsModal = {showSettingsModal}
          settingsModalRef = {settingsModalRef} >
        </SettingsModal>
      )}

    </div>

  );
}

export default App;