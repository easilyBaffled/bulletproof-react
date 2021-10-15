import { useDiscussions } from '../api/getDiscussions';
import { DeleteDiscussion } from './DeleteDiscussion';
import { Table, Spinner, Link } from '@/components/Elements';
import { formatDate } from '@/utils/format';
export const DiscussionsList = () => {
    const discussionsQuery = useDiscussions();
    if ( discussionsQuery.isLoading ) {
        return ( <div className="w-full h-48 flex justify-center items-center">
            <Spinner size="lg"/>
        </div> );
    }
    if ( !discussionsQuery.data )
        return null;
    return ( <Table data={discussionsQuery.data} columns={[
        {
            field: 'title',
            title: 'Title'
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
                return <Link to={`./${id}`}>View</Link>;
            },
            field: 'id',
            title: ''
        },
        {
            Cell({ entry: { id } }) {
                return <DeleteDiscussion id={id}/>;
            },
            field: 'id',
            title: ''
        }
    ]}/> );
};
