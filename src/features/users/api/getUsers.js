import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';
export const getUsers = () => {
    return axios.get( `/users` );
};
export const useUsers = ({ config } = {}) => {
    return useQuery({
        ...config,
        queryFn:  () => getUsers(),
        queryKey: [ 'users' ]
    });
};
