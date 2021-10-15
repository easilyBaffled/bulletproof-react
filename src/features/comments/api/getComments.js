import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
export const getComments = ({ discussionId }) => {
    return axios.get( `/comments`, {
        params: {
            discussionId
        }
    });
};
export const useComments = ({ discussionId, config }) => {
    return useQuery({
        ...config,
        queryFn:  () => getComments({ discussionId }),
        queryKey: [ 'comments', discussionId ]
    });
};
