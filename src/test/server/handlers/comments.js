import { rest } from 'msw';
import { nanoid } from 'nanoid';
import { db, persistDb } from '../db';
import { requireAuth, delayedResponse } from '../utils';
import { API_URL } from '@/config';

export const commentsHandlers = [
    rest.get( `${API_URL}/comments`, async ( req, res, ctx ) => {
        try {
            await requireAuth( req );
            const discussionId = req.url.searchParams.get( 'discussionId' ) || '';
            const result = db.comment.findMany({
                where: {
                    discussionId: {
                        equals: discussionId
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
    rest.post( `${API_URL}/comments`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const data = req.body;
            const result = db.comment.create({
                authorId:  user.id,
                createdAt: Date.now(),
                id:        nanoid(),
                ...data
            });
            persistDb( 'comment' );
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    }),
    rest.delete( `${API_URL}/comments/:commentId`, async ( req, res, ctx ) => {
        try {
            const user = await requireAuth( req );
            const { commentId } = req.params;
            const result = db.comment.delete({
                where: {
                    id: {
                        equals: commentId
                    },
                    ...( user.role === 'USER' && {
                        authorId: {
                            equals: user.id
                        }
                    })
                }
            });
            persistDb( 'comment' );
            return delayedResponse( ctx.json( result ) );
        } catch ( error ) {
            return delayedResponse(
                ctx.status( 400 ),
                ctx.json({ message: error?.message || 'Server Error' })
            );
        }
    })
];
