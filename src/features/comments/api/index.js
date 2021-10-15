import { axios } from '@/lib/axios';
export const getDiscussionComments = ({ discussionId }) => {
    return axios.get( `/comments`, {
        params: {
            discussionId
        }
    });
};
export const createComment = ({ data }) => {
    return axios.post( '/comments', data );
};
export const deleteComment = ({ commentId }) => {
    return axios.delete( `/comments/${commentId}` );
};
