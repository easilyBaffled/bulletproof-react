import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
export const deleteComment = ({ commentId }) => {
    return axios.delete( `/comments/${commentId}` );
};
export const useDeleteComment = ({ config, discussionId }) => {
    const { addNotification } = useNotificationStore();
    return useMutation({
        onError: ( _, __, context ) => {
            if ( context?.previousComments ) {
                queryClient.setQueryData(
                    [ 'comments', discussionId ],
                    context.previousComments
                );
            }
        },
        onMutate: async ( deletedComment ) => {
            await queryClient.cancelQueries([ 'comments', discussionId ]);
            const previousComments = queryClient.getQueryData([
                'comments',
                discussionId
            ]);
            queryClient.setQueryData(
                [ 'comments', discussionId ],
                previousComments?.filter(
                    ( comment ) => comment.id !== deletedComment.commentId
                )
            );
            return { previousComments };
        },
        onSuccess: () => {
            queryClient.invalidateQueries([ 'comments', discussionId ]);
            addNotification({
                title: 'Comment Deleted',
                type:  'success'
            });
        },
        ...config,
        mutationFn: deleteComment
    });
};
