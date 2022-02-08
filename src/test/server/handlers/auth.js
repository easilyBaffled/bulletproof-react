/* eslint-disable max-lines, max-len, max-statements */
import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { db, persistDb } from '../db';
import { authenticate, delayedResponse, hash, requireAuth } from '../utils';
import { API_URL } from '@/config';

export const authHandlers = [
    rest.post( `${API_URL}/auth/register`, ( req, res, ctx ) => {
        try {
            const userObject = req.body;
            const existingUser = db.user.findFirst({
                where: {
                    email: {
                        equals: userObject.email
                    }
                }
            });
            if ( existingUser ) throw new Error( 'The user already exists' );

            let teamId;
            let role;
            if ( !userObject.teamId ) {
                const team = db.team.create({
                    createdAt: Date.now(),
                    id:        nanoid(),
                    name:      userObject.teamName ?? `${userObject.firstName} Team`
                });
                persistDb( 'team' );
                teamId = team.id;
                role = 'ADMIN';
            } else {
                const existingTeam = db.team.findFirst({
                    where: {
                        id: {
                            equals: userObject.teamId
                        }
                    }
                });
                if ( !existingTeam ) {
                    throw new Error(
                        'The team you are trying to join does not exist!'
                    );
                }

                teamId = userObject.teamId;
                role = 'USER';
            }
            db.user.create({
                ...userObject,
                createdAt: Date.now(),
                id:        nanoid(),
                password:  hash( userObject.password ),
                role,
                teamId
            });
            persistDb( 'user' );
            const result = authenticate({
                email:    userObject.email,
                password: userObject.password
            });
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    }),
    rest.post( `${API_URL}/auth/login`, ( req, res, ctx ) => {
        try {
            const credentials = req.body;
            const result = authenticate( credentials );
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    }),
    rest.get( `${API_URL}/auth/me`, ( req, res, ctx ) => {
        try {
            const user = requireAuth( req );
            console.tap( req, user );
            return delayedResponse( ctx.json( user ) );
        } catch ( error ) {
            console.tap( error, req );
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    })
];
