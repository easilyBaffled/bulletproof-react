import { useCallback } from "react";
import { useAuth } from './auth';

export var ROLES;
( function( ROLES ) {
    ROLES[ 'ADMIN' ] = 'ADMIN';
    ROLES[ 'USER' ] = 'USER';
})( ROLES || ( ROLES = {}) );
export const POLICIES = {
    'comment:delete': ( user, comment ) => {
        if ( user.role === 'ADMIN' ) return true;

        return user.role === 'USER' && comment.authorId === user.id;


    }
};
export const useAuthorization = () => {
    const { user } = useAuth();
    if ( !user ) throw Error( 'User does not exist!' );

    const checkAccess = useCallback(
        ({ allowedRoles }) => {
            if ( allowedRoles && allowedRoles.length > 0 ) return allowedRoles?.includes( user.role );

            return true;
        },
        [ user.role ]
    );
    return { checkAccess, role: user.role };
};
export const Authorization = ({
    policyCheck,
    allowedRoles,
    forbiddenFallback = null,
    children
}) => {
    const { checkAccess } = useAuthorization();
    let canAccess = false;
    if ( allowedRoles ) canAccess = checkAccess({ allowedRoles });

    if ( typeof policyCheck !== 'undefined' ) canAccess = policyCheck;

    return <>{canAccess ? children : forbiddenFallback}</>;
};
