import { PlusIcon } from '@heroicons/react/outline';
import * as z from 'zod';
import { useCreateDiscussion } from '../api/createDiscussion';
import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form';
import { Authorization, ROLES } from '@/lib/authorization';
const schema = z.object({
    body:  z.string().min( 1, 'Required' ),
    title: z.string().min( 1, 'Required' )
});
export const CreateDiscussion = () => {
    const createDiscussionMutation = useCreateDiscussion();
    return ( <Authorization allowedRoles={[ ROLES.ADMIN ]}>
        <FormDrawer isDone={createDiscussionMutation.isSuccess} triggerButton={<Button size="sm" startIcon={<PlusIcon className="h-4 w-4"/>}>
            Create Discussion
        </Button>} title="Create Discussion" submitButton={<Button form="create-discussion" type="submit" size="sm" isLoading={createDiscussionMutation.isLoading}>
            Submit
        </Button>}>
            <Form id="create-discussion" onSubmit={async ( values ) => {
                await createDiscussionMutation.mutateAsync({ data: values });
            }} schema={schema}>
                {({ register, formState }) => ( <>
                    <InputField label="Title" error={formState.errors[ 'title' ]} registration={register( 'title' )}/>

                    <TextAreaField label="Body" error={formState.errors[ 'body' ]} registration={register( 'body' )}/>
                </> )}
            </Form>
        </FormDrawer>
    </Authorization> );
};
