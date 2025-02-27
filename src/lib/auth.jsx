/* eslint-disable max-statements */
import { initReactQueryAuth } from 'react-query-auth';
import { Spinner } from '@/components/Elements';
import {
    loginWithEmailAndPassword,
    getUser,
    registerWithEmailAndPassword
} from '@/features/auth';
import storage from '@/utils/storage';

async function handleUserResponse( data ) {
    const { jwt, user } = data;
    storage.setToken( jwt );
    return user;
}

async function loadUser() {
    if ( storage.getToken() ) {
        const data = await getUser();
        return data;
    }
    return null;
}

async function loginFn( data ) {
    const response = await loginWithEmailAndPassword( data );
    const user = await handleUserResponse( response );
    return user;
}

async function registerFn( data ) {
    const response = await registerWithEmailAndPassword( data );
    const user = await handleUserResponse( response );
    return user;
}

async function logoutFn() {
    storage.clearToken();
    window.location.assign( window.location.origin );
}

const authConfig = {
    LoaderComponent() {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner size="xl" />
            </div>
        );
    },
    loadUser,
    loginFn,
    logoutFn,
    registerFn
};
export const { AuthProvider, useAuth } = initReactQueryAuth( authConfig );
