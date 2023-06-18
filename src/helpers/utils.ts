export const decodeJWT = (token?: string) => {
    if (token) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
    return undefined;
};
