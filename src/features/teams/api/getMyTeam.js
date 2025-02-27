import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
export const getMyTeam = () => {
    return axios.get( '/team' );
};
export const useMyTeam = ({ config } = {}) => {
    return useQuery({
        ...config,
        queryFn:  () => getMyTeam(),
        queryKey: [ 'my-teams' ]
    });
};
