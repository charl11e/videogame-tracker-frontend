import * as api from '../api.js'

function SettingsModal({
    showSettingsModal,
    settingsModalRef,
    setShowSettingsModal,
    selectedUserId,
    setSelectedUserId,
    setUsers,
    setErrorMessage
}) {

    if (!showSettingsModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={settingsModalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-2xl font-bold mb-4">Settings</h3>


                <h4 className="text-lg font-semibold mb-4">Delete the currently selected user and their games</h4>
                <h4 className="text-lg font-semibold mb-4 underline">This action is irreversible</h4>
                <button className="px-4 py-2 bg-red-500 rounded hover:bg-red-700 font-semibold text-white"
                onClick={async () => {
                    try {
                        await api.delUser(selectedUserId);
                        const res = await api.fetchUsers();
                        setUsers(res.data);
                        setShowSettingsModal(false);
                        setSelectedUserId('');
                    } catch (err) {
                        console.error("Error deleting user: ", err);
                        setErrorMessage("Failed deleting user (" + err + ")");
                    }
                }}>Delete User</button>

                <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-semibold"
                    onClick={() => setShowSettingsModal(false)}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal;