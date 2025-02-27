import { useDeleteUser } from '../api/deleteUser';
import { Button, ConfirmationDialog } from '@/components/Elements';
import { useAuth } from '@/lib/auth';
export const DeleteUser = ({ id }) => {
    const { user } = useAuth();
    const deleteUserMutation = useDeleteUser();
    if ( user?.id === id )
        return null;
    return ( <ConfirmationDialog icon="danger" title="Delete User" body="Are you sure you want to delete this user?" triggerButton={<Button variant="danger">Delete</Button>} confirmButton={<Button isLoading={deleteUserMutation.isLoading} type="button" className="bg-red-600" onClick={() => deleteUserMutation.mutate({ userId: id })}>
          Delete
    </Button>}/> );
};
