import * as api from '../api.js';

function ProgressModal({
    modalRef,
    setUpdatingGame,
    updatingGame,
    selectedUserId,
    updatingStatus,
    updatedProgress,
    updatedStatus,
    setGames
}) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">

                <div className="flex justify-end gap-2 mt-4">

                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-semibold"
                    onClick={() => setUpdatingGame(null)}>Cancel</button>

                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold"
                    onClick={async () => {
                        await api.updateGame(updatingGame.id, {
                            title: updatingGame.title,
                            platform: updatingGame.platform,
                            userID: selectedUserId,
                            status: updatedStatus,
                            progress: updatedProgress
                        });

                        setUpdatingGame(null);
                        const res = await api.getGamesByUser(selectedUserId);
                        setGames(res.data);
                    }}>Save</button>

                </div>
            </div>
        </div>
    )
}

export default ProgressModal