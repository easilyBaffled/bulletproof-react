import { CreateDiscussion } from '../components/CreateDiscussion';
import { DiscussionsList } from '../components/DiscussionsList';
import { ContentLayout } from '@/components/Layout';
export const Discussions = () => {
    return ( <ContentLayout title="Discussions">
        <div className="flex justify-end">
            <CreateDiscussion />
        </div>
        <div className="mt-4">
            <DiscussionsList />
        </div>
    </ContentLayout> );
};
