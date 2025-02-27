import { PencilIcon } from '@heroicons/react/solid';
import * as z from 'zod';
import { useUpdateProfile } from '../api/updateProfile';
import { Button } from '@/components/Elements';
import { Form, FormDrawer, InputField } from '@/components/Form';
import { TextAreaField } from '@/components/Form/TextareaField';
import { useAuth } from '@/lib/auth';
const schema = z.object({
    email:     z.string().min( 1, 'Required' ),
    firstName: z.string().min( 1, 'Required' ),
    lastName:  z.string().min( 1, 'Required' )
});
export const UpdateProfile = () => {
    const { user } = useAuth();
    const updateProfileMutation = useUpdateProfile();
    return ( <FormDrawer isDone={updateProfileMutation.isSuccess} triggerButton={<Button startIcon={<PencilIcon className="h-4 w-4"/>} size="sm">
          Update Profile
    </Button>} title="Update Profile" submitButton={<Button form="update-profile" type="submit" size="sm" isLoading={updateProfileMutation.isLoading}>
          Submit
    </Button>}>
        <Form id="update-profile" onSubmit={async ( values ) => {
            await updateProfileMutation.mutateAsync({ data: values });
        }} options={{
            defaultValues: {
                bio:       user?.bio,
                email:     user?.email,
                firstName: user?.firstName,
                lastName:  user?.lastName
            }
        }} schema={schema}>
            {({ register, formState }) => ( <>
                <InputField label="First Name" error={formState.errors[ 'firstName' ]} registration={register( 'firstName' )}/>
                <InputField label="Last Name" error={formState.errors[ 'lastName' ]} registration={register( 'lastName' )}/>
                <InputField label="Email Address" type="email" error={formState.errors[ 'email' ]} registration={register( 'email' )}/>

                <TextAreaField label="Bio" error={formState.errors[ 'bio' ]} registration={register( 'bio' )}/>
            </> )}
        </Form>
    </FormDrawer> );
};
