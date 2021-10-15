import { useMutation } from 'react-query';
import { axios } from '@/lib/axios';
import { useNotificationStore } from '@/stores/notifications';
export const updateTeam = ({ teamId, data }) => {
    return axios.patch( `/teams/${teamId}`, data );
};
export const useUpdateDiscussion = ({ config } = {}) => {
    const { addNotification } = useNotificationStore();
    return useMutation({
        ...config,
        mutationFn: updateTeam,
        onSuccess:  () => {
            addNotification({
                title: 'Profile Updated',
                type:  'success'
            });
        }
    });
};
