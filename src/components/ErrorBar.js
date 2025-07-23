function ErrorBar({
    errorMessage
}) {
    return (
        <div>
            {errorMessage && (
            <div className="bg-red-500 text-white p-2 text-center font-bold w-full rounded">
                <h1>ERROR: {errorMessage}</h1>
            </div>
            )}
        </div>
    )
}

export default ErrorBar;