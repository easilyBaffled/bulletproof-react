import { Spinner } from './Spinner';
const meta = {
    component:  Spinner,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/Spinner'
};
export default meta;
const Template = ( props ) => <Spinner {...props}/>;
export const Default = Template.bind({});
Default.args = {};
