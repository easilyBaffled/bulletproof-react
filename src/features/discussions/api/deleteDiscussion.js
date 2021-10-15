import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
export const deleteDiscussion = ({ discussionId }) => {
    return axios.delete( `/discussions/${discussionId}` );
};
export const useDeleteDiscussion = ({ config } = {}) => {
    const { addNotification } = useNotificationStore();
    return useMutation({
        onError: ( _, __, context ) => {
            if ( context?.previousDiscussions ) {
                queryClient.setQueryData(
                    'discussions',
                    context.previousDiscussions
                );
            }
        },
        onMutate: async ( deletedDiscussion ) => {
            await queryClient.cancelQueries( 'discussions' );
            const previousDiscussions = queryClient.getQueryData( 'discussions' );
            queryClient.setQueryData(
                'discussions',
                previousDiscussions?.filter(
                    ( discussion ) =>
                        discussion.id !== deletedDiscussion.discussionId
                )
            );
            return { previousDiscussions };
        },
        onSuccess: () => {
            queryClient.invalidateQueries( 'discussions' );
            addNotification({
                title: 'Discussion Deleted',
                type:  'success'
            });
        },
        ...config,
        mutationFn: deleteDiscussion
    });
};
