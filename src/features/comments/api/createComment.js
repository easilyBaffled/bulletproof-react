import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
export const createComment = ({ data }) => {
    return axios.post( '/comments', data );
};
export const useCreateComment = ({ config, discussionId }) => {
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
        onMutate: async ( newComment ) => {
            await queryClient.cancelQueries([ 'comments', discussionId ]);
            const previousComments = queryClient.getQueryData([
                'comments',
                discussionId
            ]);
            queryClient.setQueryData(
                [ 'comments', discussionId ],
                [ ...( previousComments || []), newComment.data ]
            );
            return { previousComments };
        },
        onSuccess: () => {
            queryClient.invalidateQueries([ 'comments', discussionId ]);
            addNotification({
                title: 'Comment Created',
                type:  'success'
            });
        },
        ...config,
        mutationFn: createComment
    });
};
