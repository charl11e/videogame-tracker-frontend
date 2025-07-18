function SettingsModal({
    showSettingsModal,
    settingsModalRef
}) {

    if (!showSettingsModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={settingsModalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-2xl font-bold mb-4">Settings</h3>
            </div>
        </div>
    )
}

export default SettingsModal;