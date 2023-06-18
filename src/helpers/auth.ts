import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export const parseCookie = (str: string): { [name: string]: string } => {
    return str
        .split(';')
        .map((v) => v.split('='))
        .reduce((acc: { [name: string]: string }, v) => {
            if (v.length > 1) {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            } else {
                return {};
            }
        }, {});
};

export const setToken = (token: string): void => {
    if (typeof window !== 'undefined') {
        let cookie = `token=${token}; path=/;`;
        const date = new Date();
        const time = date.getTime();
        const expireTime = time + Number(process.env.JWT_EXPIRATION_TIME);
        date.setTime(expireTime);
        cookie += ` expires=${date.toUTCString()};`;
        document.cookie = cookie;
    }
};

export const removeToken = (): void => {
    if (typeof window !== 'undefined') {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
};

export const getToken = (cookies?: NextApiRequestCookies): string | null => {
    if (cookies) {
        if (cookies.token) {
            return cookies.token;
        }
        return null;
    }
    if (typeof window !== 'undefined') {
        const cookie = parseCookie(document.cookie);
        if (cookie.token) return cookie.token;
    }
    return null;
};
