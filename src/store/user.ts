import { getToken } from 'helpers/auth';
import { decodeJWT } from 'helpers/utils';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type UserData = {
    user_id?: number;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
};

interface UserDataState {
    data: UserData;
    setUser: (data: UserData) => void;
    getUser: () => void;
    reset: () => void;
}

const useUserDataStore = create<UserDataState>()(
    devtools((set, get) => ({
        data: getToken() ? decodeJWT(getToken() as string) : {},
        setUser: (data: UserData) => {
            set({ data: { ...get().data, ...data } });
        },
        getUser: () => {
            return get().data;
        },
        reset: () => {
            set({ data: {} });
        },
    })),
);

export default useUserDataStore;
