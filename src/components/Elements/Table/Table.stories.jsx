import { Table } from './Table';
const meta = {
    component:  Table,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/Table'
};
export default meta;
const data = [
    {
        email: 'jane.cooper@example.com',
        id:    '1',
        name:  'Jane Cooper',
        role:  'Admin',
        title: 'Regional Paradigm Technician'
    },
    {
        email: 'cody.fisher@example.com',
        id:    '2',
        name:  'Cody Fisher',
        role:  'Owner',
        title: 'Product Directives Officer'
    }
];
const Template = ( props ) => <Table {...props}/>;
export const Default = Template.bind({});
Default.args = {
    columns: [
        {
            field: 'name',
            title: 'Name'
        },
        {
            field: 'title',
            title: 'Title'
        },
        {
            field: 'role',
            title: 'Role'
        },
        {
            field: 'email',
            title: 'Email'
        }
    ],
    data
};
