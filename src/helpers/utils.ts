export const decodeJWT = (token?: string) => {
    if (token) {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
    return undefined;
};

// Convert persian number to english
export const faNumberToEn = (s: string) => {
    return s.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};
