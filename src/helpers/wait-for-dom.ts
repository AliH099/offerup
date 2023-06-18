const waitForDom = () => {
    return new Promise((resolve, reject) => {
        if (typeof window !== 'undefined') {
            resolve('ready!');
        }
    });
};

export default waitForDom;
