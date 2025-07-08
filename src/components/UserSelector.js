function UserSelector ({
    selectedUserId,
    setSelectedUserId,
    users
}) {
    return (
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
    )
}

export default UserSelector