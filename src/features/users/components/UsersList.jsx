import { useUsers } from '../api/getUsers';
import { DeleteUser } from './DeleteUser';
import { Table, Spinner } from '@/components/Elements';
import { formatDate } from '@/utils/format';
export const UsersList = () => {
    const usersQuery = useUsers();
    if ( usersQuery.isLoading ) {
        return ( <div className="w-full h-48 flex justify-center items-center">
            <Spinner size="lg"/>
        </div> );
    }
    if ( !usersQuery.data )
        return null;
    return ( <Table data={usersQuery.data} columns={[
        {
            field: 'firstName',
            title: 'First Name'
        },
        {
            field: 'lastName',
            title: 'Last Name'
        },
        {
            field: 'email',
            title: 'Email'
        },
        {
            field: 'role',
            title: 'Role'
        },
        {
            Cell({ entry: { createdAt } }) {
                return <span>{formatDate( createdAt )}</span>;
            },
            field: 'createdAt',
            title: 'Created At'
        },
        {
            Cell({ entry: { id } }) {
                return <DeleteUser id={id}/>;
            },
            field: 'id',
            title: ''
        }
    ]}/> );
};
