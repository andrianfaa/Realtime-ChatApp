export const SessionStorage = {
    set: <T>(key: string, value: T) => {
        const data = JSON.stringify(value);

        sessionStorage.setItem(key, data);
    },

    get: <T>(key: string): T | null => {
        const item = sessionStorage.getItem(key);

        if (!item) return null;

        return JSON.parse(item);
    },

    delete: (key: string): boolean => {
        const item = sessionStorage.getItem(key);

        if (!item) return false;

        sessionStorage.removeItem(key);
        return true;
    },

    clear: () => sessionStorage.clear()
};

export const LocalStorage = {
    set: <T>(key: string, value: T) => {
        const data = JSON.stringify(value);

        localStorage.setItem(key, data);
    },

    get: <T>(key: string): T | null => {
        const item = localStorage.getItem(key);

        if (!item) return null;

        return JSON.parse(item);
    },

    delete: (key: string): boolean => {
        const item = localStorage.getItem(key);

        if (!item) return false;

        localStorage.removeItem(key);
        return true;
    },

    clear: () => localStorage.clear()
};
