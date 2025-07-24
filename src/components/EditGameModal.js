// TODO add file size limits for upload

import * as api from '../api.js';

function EditGameModal({
    modalRef,
    editedTitle,
    setEditedTitle,
    editedPlatform,
    setEditedPlatform,
    setEditingGame,
    editingGame,
    selectedUserId,
    setGames,
    editedGameCover,
    setEditedGameCover,
    setErrorMessage
}) {

    if (!editingGame) return null;

    return (
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

                <label className="block mb-2 text-xl font-semibold">
                    Cover image:
                    <input type="file" accept="image/*" className="w-full p-2 border rounded mt-1 font-normal"
                    onChange={(e) => setEditedGameCover(e.target.files[0])}></input>
                </label>

                <div className="flex justify-end gap-2 mt-4">

                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-semibold"
                    onClick={() => setEditingGame(null)}>Cancel</button>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                    onClick={async () => {
                        try {
                            await api.updateGame(editingGame.id, {
                                title: editedTitle,
                                platform: editedPlatform,
                                userID: selectedUserId,
                                status: editingGame.status,
                                progress: editingGame.progress
                            });

                            // Upload new game cover if uploaded
                            if (editedGameCover) {
                                await api.uploadGameCover(editingGame.id, editedGameCover);
                            }

                            setEditingGame(null);
                            const res = await api.getGamesByUser(selectedUserId);
                            setGames(res.data);
                        } catch (err) {
                            console.error("Error updating game: ", err);
                            setErrorMessage("Failed updating game (" + err + ")");
                        }
                    }}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditGameModal;