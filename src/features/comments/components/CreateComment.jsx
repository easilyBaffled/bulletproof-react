import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';
import { useCreateComment } from '../api/createComment';
import { Button } from '@/components/Elements';
import { Form, FormDrawer, TextAreaField } from '@/components/Form';
const schema = z.object({
    body: z.string().min( 1, 'Required' )
});
export const CreateComment = ({ discussionId }) => {
    const createCommentMutation = useCreateComment({ discussionId });
    return ( <>
        <FormDrawer isDone={createCommentMutation.isSuccess} triggerButton={<Button size="sm" startIcon={<PlusIcon className="h-4 w-4"/>}>
            Create Comment
        </Button>} title="Create Comment" submitButton={<Button isLoading={createCommentMutation.isLoading} form="create-comment" type="submit" size="sm" disabled={createCommentMutation.isLoading}>
            Submit
        </Button>}>
            <Form id="create-comment" onSubmit={async ( values ) => {
                await createCommentMutation.mutateAsync({
                    data: {
                        body: values.body,
                        discussionId
                    }
                });
            }} schema={schema}>
                {({ register, formState }) => ( <TextAreaField label="Body" error={formState.errors[ 'body' ]} registration={register( 'body' )}/> )}
            </Form>
        </FormDrawer>
    </> );
};
