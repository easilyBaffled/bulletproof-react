import { rest } from 'msw';
import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';
import { API_URL } from '@/config';

export const teamsHandlers = [
    rest.get( `${API_URL}/team`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const result = db.team.findFirst({
                where: {
                    id: {
                        equals: user.teamId
                    }
                }
            });
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    }),
    rest.get( `${API_URL}/teams`, ( req, res, ctx ) => {
        try {
            const result = db.team.getAll();
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    }),
    rest.patch( `${API_URL}/team/:teamId`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const data = req.body;
            requireAdmin( user );
            const result = db.team.update({
                data,
                where: {
                    id: user.teamId
                }
            });
            persistDb( 'team' );
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    })
];
