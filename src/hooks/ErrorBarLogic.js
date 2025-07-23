import {useState} from 'react';

function useErrorBarLogic() {
    const [errorMessage, setErrorMessage] = useState(null);
    return [errorMessage, setErrorMessage];
} 

export default useErrorBarLogic;