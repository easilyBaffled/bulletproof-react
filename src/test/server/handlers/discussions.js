/* eslint-disable max-lines */
import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { db, persistDb } from '../db';
import { requireAuth, requireAdmin, delayedResponse } from '../utils';
import { API_URL } from '@/config';

export const discussionsHandlers = [
    rest.get( `${API_URL}/discussions`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const result = db.discussion.findMany({
                where: {
                    teamId: {
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
    rest.get( `${API_URL}/discussions/:discussionId`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const { discussionId } = req.params;
            const result = db.discussion.findFirst({
                where: {
                    id: {
                        equals: discussionId
                    },
                    teamId: {
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
    rest.post( `${API_URL}/discussions`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const data = req.body;
            requireAdmin( user );
            const result = db.discussion.create({
                createdAt: Date.now(),
                id:        nanoid(),
                teamId:    user.teamId,
                ...data
            });
            persistDb( 'discussion' );
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    }),
    rest.patch(
        `${API_URL}/discussions/:discussionId`,
        async ( req, res, ctx ) => {
            try {
                const user = await requireAuth( req );
                const data = req.body;
                const { discussionId } = req.params;
                requireAdmin( user );
                const result = db.discussion.update({
                    data,
                    where: {
                        id: {
                            equals: discussionId
                        },
                        teamId: {
                            equals: user.teamId
                        }
                    }
                });
                persistDb( 'discussion' );
                return delayedResponse( ctx.json( result ) );
            } catch ( error ) {
                return delayedResponse(
                    ctx.status( 400 ),
                    ctx.json({ message: error?.message || 'Server Error' })
                );
            }
        }
    ),
    rest.delete(
        `${API_URL}/discussions/:discussionId`,
        async ( req, res, ctx ) => {
            try {
                const user = await requireAuth( req );
                const { discussionId } = req.params;
                requireAdmin( user );
                const result = db.discussion.delete({
                    where: {
                        id: {
                            equals: discussionId
                        }
                    }
                });
                persistDb( 'discussion' );
                return delayedResponse( ctx.json( result ) );
            } catch ( error ) {
                return delayedResponse(
                    ctx.status( 400 ),
                    ctx.json({ message: error?.message || 'Server Error' })
                );
            }
        }
    )
];
