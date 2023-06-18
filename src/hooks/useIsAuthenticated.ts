import { getToken } from 'helpers/auth';
import waitForDom from 'helpers/wait-for-dom';
import { useEffect, useState } from 'react';

const useIsAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect(() => {
        waitForDom().then(() => {
            if (getToken() !== null) {
                setIsAuthenticated(true);
            }
        });
    }, []);
    return isAuthenticated;
};

export default useIsAuthenticated;
