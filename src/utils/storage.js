const storagePrefix = 'bulletproof_react_';
const storage = {
    clearToken: () => {
        window.localStorage.removeItem( `${storagePrefix}token` );
    },
    getToken: () => {
        return JSON.parse( window.localStorage.getItem( `${storagePrefix}token` ) );
    },
    setToken: ( token ) => {
        window.localStorage.setItem(
            `${storagePrefix}token`,
            JSON.stringify( token )
        );
    }
};
export default storage;
