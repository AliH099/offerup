const calcInterval = (date: string) => {
    const destinationTime = new Date(date).getTime();
    const now = new Date().getTime();
    const miliseconds = now - destinationTime;

    const hours = miliseconds / (1000 * 60 * 60);
    switch (true) {
        case hours < 1:
            return 'لحظاتی قبل';
        case hours < 24:
            return 'ساعاتی قبل';
        case hours < 7 * 24:
            return `${Math.floor(hours / 24)} روز قبل `;
        case hours < 7 * 24 * 30:
            return `${Math.floor(hours / (24 * 7))} هفته قبل `;
        case hours < 7 * 24 * 30 * 12:
            return `${Math.floor(hours / (24 * 7 * 30))} ماه قبل `;
        default:
            return `${Math.floor(hours / (24 * 7 * 30 * 12))} سال قبل `;
    }
};

export default calcInterval;
