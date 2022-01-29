import { Notification } from './Notification';

const meta = {
    component:  Notification,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Notifications'
};
export default meta;
const Template = ( props ) => <Notification {...props} />;
export const Info = Template.bind({});
Info.args = {
    notification: {
        id:      '1',
        message: 'This is info notification',
        title:   'Hello Info',
        type:    'info'
    },
    onDismiss: ( id ) => window.alert( `Dismissing Notification with id: ${id}` )
};
export const Success = Template.bind({});
Success.args = {
    notification: {
        id:      '1',
        message: 'This is success notification',
        title:   'Hello Success',
        type:    'success'
    },
    onDismiss: ( id ) => window.alert( `Dismissing Notification with id: ${id}` )
};
export const Warning = Template.bind({});
Warning.args = {
    notification: {
        id:      '1',
        message: 'This is warning notification',
        title:   'Hello Warning',
        type:    'warning'
    },
    onDismiss: ( id ) => window.alert( `Dismissing Notification with id: ${id}` )
};
export const Error = Template.bind({});
Error.args = {
    notification: {
        id:      '1',
        message: 'This is error notification',
        title:   'Hello Error',
        type:    'error'
    },
    onDismiss: ( id ) => window.alert( `Dismissing Notification with id: ${id}` )
};
