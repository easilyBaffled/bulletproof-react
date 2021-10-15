import { Link } from './Link';
const meta = {
    component:  Link,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/Link'
};
export default meta;
const Template = ( props ) => ( <Link to="/" {...props}>
    Hello
</Link> );
export const Default = Template.bind({});
Default.args = {};
