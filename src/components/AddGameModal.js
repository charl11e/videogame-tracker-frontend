import * as api from '../api';

function AddGameModal({
    showAddGameModal,
    addModalRef
}) {
    
    if (!showAddGameModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div ref={addModalRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
            </div>
        </div>

    )

}

export default AddGameModal;