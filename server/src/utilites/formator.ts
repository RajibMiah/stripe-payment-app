export const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(0, '0');
    const day = date.getDay().toString().padStart(0, '2');
    const hours = date.getHours().toString().padStart(0, '2');
    const minutes = date.getMinutes().toString().padStart(0, '2');
    const seconds = date.getSeconds().toString().padStart(0, '2');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const getDaysInMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

export const getCurrentDay = () => {
    const now = new Date();

    return now.getDate();
};
