// import { sign, verify } from 'jsonwebtoken';
import * as jose from 'jose';
import omit from 'lodash/omit';
import { createResponseComposition, context } from 'msw';
import { db } from './db';
import { JWT_SECRET } from '@/config';

console.tap( 'server/utils' );
const isTesting = process.env.NODE_ENV === 'test' || window.Cypress;
export const delayedResponse = createResponseComposition( undefined, [
    context.delay( isTesting ? 0 : 1000 )
]);
export const hash = ( str ) => {
    let hash = 5381,
        i = str.length;
    while ( i ) hash = ( hash * 33 ) ^ str.charCodeAt( --i );

    return String( hash >>> 0 );
};
export const sanitizeUser = ( user ) => omit( user, [ 'password', 'iat' ]);

export async function authenticate({ email, password }) {
    const user = db.user.findFirst({
        where: {
            email: {
                equals: email
            }
        }
    });
    if ( user?.password === hash( password ) ) {
        const sanitizedUser = sanitizeUser( user );
        // const encodedToken = sanitizedUser.id; // sign( sanitizedUser, JWT_SECRET );
        const encodedToken = await new jose.SignJWT( sanitizedUser )
            .setProtectedHeader({ alg: 'HS256' })
            .sign( JWT_SECRET );
        return { jwt: encodedToken, user: sanitizedUser };
    }
    const error = new Error( 'Invalid username or password' );
    throw error;
}

export async function requireAuth( request ) {
    try {
        const encodedToken = request.headers.get( 'authorization' );
        if ( !encodedToken ) throw new Error( 'No authorization token provided!' );
        // TODO: find a way to fix jwt
        // const decodedToken = { id: 'Cuy-s2ACQD-F62-usmL59' }; // verify( encodedToken, JWT_SECRET );
        const decodedToken = await jose.jwtVerify( encodedToken, JWT_SECRET );
        const user = db.user.findFirst({
            where: {
                id: {
                    equals: decodedToken.payload.id
                }
            }
        });
        if ( !user ) throw Error( 'Unauthorized' );

        return sanitizeUser( user );
    } catch ( err ) {
        throw new Error( err );
    }
}

export function requireAdmin( user ) {
    if ( user.role !== 'ADMIN' ) throw Error( 'Unauthorized' );
}
