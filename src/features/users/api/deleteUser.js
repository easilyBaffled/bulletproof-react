import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
export const deleteUser = ({ userId }) => {
    return axios.delete( `/users/${userId}` );
};
export const useDeleteUser = ({ config } = {}) => {
    const { addNotification } = useNotificationStore();
    return useMutation({
        onError: ( _, __, context ) => {
            if ( context?.previousUsers )
                queryClient.setQueryData( 'users', context.previousUsers );
        },
        onMutate: async ( deletedUser ) => {
            await queryClient.cancelQueries( 'users' );
            const previousUsers = queryClient.getQueryData( 'users' );
            queryClient.setQueryData(
                'users',
                previousUsers?.filter(
                    ( discussion ) => discussion.id !== deletedUser.userId
                )
            );
            return { previousUsers };
        },
        onSuccess: () => {
            queryClient.invalidateQueries( 'users' );
            addNotification({
                title: 'User Deleted',
                type:  'success'
            });
        },
        ...config,
        mutationFn: deleteUser
    });
};
