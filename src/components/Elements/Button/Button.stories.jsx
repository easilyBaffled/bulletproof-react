import { Button } from './Button';
const meta = {
    component:  Button,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/Button'
};
export default meta;
const Template = ( props ) => <Button {...props}/>;
export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary Button',
    variant:  'primary'
};
export const Inverse = Template.bind({});
Inverse.args = {
    children: 'Inverse Button',
    variant:  'inverse'
};
export const Danger = Template.bind({});
Danger.args = {
    children: 'Danger Button',
    variant:  'danger'
};
