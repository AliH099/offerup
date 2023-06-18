import { useEffect, useState } from 'react';
import useUserDataStore, { UserData } from 'store/user';

const useUserData = () => {
    const [data, setData] = useState<UserData>();
    const { data: userData, ...state } = useUserDataStore();

    useEffect(() => {
        setData(userData);
    }, [userData]);

    return { data: data, ready: data !== undefined, ...state };
};

export default useUserData;
