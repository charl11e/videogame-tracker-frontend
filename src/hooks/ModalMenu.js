import {useState, useEffect, useRef} from 'react';

function useModalMenu() {

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

  return {
    openMenuId,
    editingGame,
    editedTitle,
    editedPlatform,
    deletingGame,
    setOpenMenuId,
    setEditingGame,
    setEditedTitle,
    setEditedPlatform,
    setDeletingGame,
    modalRef,
    menuRef
  }

} 

export default useModalMenu;