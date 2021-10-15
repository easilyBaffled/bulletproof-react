import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
export const updateDiscussion = ({ data, discussionId }) => {
    return axios.patch( `/discussions/${discussionId}`, data );
};
export const useUpdateDiscussion = ({ config } = {}) => {
    const { addNotification } = useNotificationStore();
    return useMutation({
        onError: ( _, __, context ) => {
            if ( context?.previousDiscussion ) {
                queryClient.setQueryData(
                    [ 'discussion', context.previousDiscussion.id ],
                    context.previousDiscussion
                );
            }
        },
        onMutate: async ( updatingDiscussion ) => {
            await queryClient.cancelQueries([
                'discussion',
                updatingDiscussion?.discussionId
            ]);
            const previousDiscussion = queryClient.getQueryData([
                'discussion',
                updatingDiscussion?.discussionId
            ]);
            queryClient.setQueryData(
                [ 'discussion', updatingDiscussion?.discussionId ],
                {
                    ...previousDiscussion,
                    ...updatingDiscussion.data,
                    id: updatingDiscussion.discussionId
                }
            );
            return { previousDiscussion };
        },
        onSuccess: ( data ) => {
            queryClient.refetchQueries([ 'discussion', data.id ]);
            addNotification({
                title: 'Discussion Updated',
                type:  'success'
            });
        },
        ...config,
        mutationFn: updateDiscussion
    });
};
