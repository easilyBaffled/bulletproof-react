import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';
import { useDiscussion } from '../api/getDiscussion';
import { useUpdateDiscussion } from '../api/updateDiscussion';
import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';
const schema = z.object({
    body:  z.string().min( 1, 'Required' ),
    title: z.string().min( 1, 'Required' )
});
export const UpdateDiscussion = ({ discussionId }) => {
    const discussionQuery = useDiscussion({ discussionId });
    const updateDiscussionMutation = useUpdateDiscussion();
    return ( <Authorization allowedRoles={[ ROLES.ADMIN ]}>
        <FormDrawer isDone={updateDiscussionMutation.isSuccess} triggerButton={<Button startIcon={<PencilIcon className="h-4 w-4"/>} size="sm">
            Update Discussion
        </Button>} title="Update Discussion" submitButton={<Button form="update-discussion" type="submit" size="sm" isLoading={updateDiscussionMutation.isLoading}>
            Submit
        </Button>}>
            <Form id="update-discussion" onSubmit={async ( values ) => {
                await updateDiscussionMutation.mutateAsync({ data: values, discussionId });
            }} options={{
                defaultValues: {
                    body:  discussionQuery.data?.body,
                    title: discussionQuery.data?.title
                }
            }} schema={schema}>
                {({ register, formState }) => ( <>
                    <InputField label="Title" error={formState.errors[ 'title' ]} registration={register( 'title' )}/>
                    <TextAreaField label="Body" error={formState.errors[ 'body' ]} registration={register( 'body' )}/>
                </> )}
            </Form>
        </FormDrawer>
    </Authorization> );
};
