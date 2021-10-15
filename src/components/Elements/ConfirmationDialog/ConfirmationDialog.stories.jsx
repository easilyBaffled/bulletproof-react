import { Button } from '../Button';
import { ConfirmationDialog } from './ConfirmationDialog';
const meta = {
    component:  ConfirmationDialog,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/ConfirmationDialog'
};
export default meta;
const Template = ( props ) => <ConfirmationDialog {...props}/>;
export const Danger = Template.bind({});
Danger.args = {
    body:          'Hello World',
    confirmButton: <Button className="bg-red-500">Confirm</Button>,
    icon:          'danger',
    title:         'Confirmation',
    triggerButton: <Button>Open</Button>
};
export const Info = Template.bind({});
Info.args = {
    body:          'Hello World',
    confirmButton: <Button>Confirm</Button>,
    icon:          'info',
    title:         'Confirmation',
    triggerButton: <Button>Open</Button>
};
