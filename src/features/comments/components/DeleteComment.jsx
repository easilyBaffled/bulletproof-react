import { TrashIcon } from '@heroicons/react/outline';
import { useDeleteComment } from '../api/deleteComment';
import { Button, ConfirmationDialog } from '@/components/Elements';
export const DeleteComment = ({ id, discussionId }) => {
    const deleteCommentMutation = useDeleteComment({ discussionId });
    return ( <ConfirmationDialog isDone={deleteCommentMutation.isSuccess} icon="danger" title="Delete Comment" body="Are you sure you want to delete this comment?" triggerButton={<Button variant="danger" size="sm" startIcon={<TrashIcon className="h-4 w-4"/>}>
          Delete Comment
    </Button>} confirmButton={<Button isLoading={deleteCommentMutation.isLoading} type="button" className="bg-red-600" onClick={async () => await deleteCommentMutation.mutateAsync({ commentId: id })}>
          Delete
    </Button>}/> );
};
