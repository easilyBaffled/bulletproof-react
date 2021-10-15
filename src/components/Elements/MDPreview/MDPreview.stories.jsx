import { MDPreview } from './MDPreview';
const meta = {
    component:  MDPreview,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/MDPreview'
};
export default meta;
const Template = ( props ) => <MDPreview {...props}/>;
export const Default = Template.bind({});
Default.args = {
    value: `## Hello World`
};
