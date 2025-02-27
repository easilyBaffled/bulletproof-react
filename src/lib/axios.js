import Axios from 'axios';
import { API_URL } from '@/config';
import { useNotificationStore } from '@/stores/notifications';
import storage from '@/utils/storage';
function authRequestInterceptor( config ) {
    const token = storage.getToken();
    if ( token ) config.headers.authorization = `${token}`;

    config.headers.Accept = 'application/json';
    return config;
}
export const axios = Axios.create({
    baseURL: API_URL
});
axios.interceptors.request.use( authRequestInterceptor );
axios.interceptors.response.use(
    ( response ) => {
        return response.data;
    },
    ( error ) => {
        const message = error.response?.data?.message || error.message;
        useNotificationStore.getState().addNotification({
            message,
            title: 'Error',
            type:  'error'
        });
        return Promise.reject( error );
    }
);
