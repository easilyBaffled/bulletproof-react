import { TrashIcon } from '@heroicons/react/outline';
import { useDeleteDiscussion } from '../api/deleteDiscussion';
import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';
export const DeleteDiscussion = ({ id }) => {
    const deleteDiscussionMutation = useDeleteDiscussion();
    return ( <Authorization allowedRoles={[ ROLES.ADMIN ]}>
        <ConfirmationDialog icon="danger" title="Delete Discussion" body="Are you sure you want to delete this discussion?" triggerButton={<Button variant="danger" startIcon={<TrashIcon className="h-4 w-4"/>}>
            Delete
        </Button>} confirmButton={<Button isLoading={deleteDiscussionMutation.isLoading} type="button" className="bg-red-600" onClick={async () => await deleteDiscussionMutation.mutateAsync({ discussionId: id })}>
            Delete
        </Button>}/>
    </Authorization> );
};
