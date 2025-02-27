import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
export const createDiscussion = ({ data }) => {
    return axios.post( `/discussions`, data );
};
export const useCreateDiscussion = ({ config } = {}) => {
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
        onMutate: async ( newDiscussion ) => {
            await queryClient.cancelQueries( 'discussions' );
            const previousDiscussions = queryClient.getQueryData( 'discussions' );
            queryClient.setQueryData( 'discussions', [
                ...( previousDiscussions || []),
                newDiscussion.data
            ]);
            return { previousDiscussions };
        },
        onSuccess: () => {
            queryClient.invalidateQueries( 'discussions' );
            addNotification({
                title: 'Discussion Created',
                type:  'success'
            });
        },
        ...config,
        mutationFn: createDiscussion
    });
};
