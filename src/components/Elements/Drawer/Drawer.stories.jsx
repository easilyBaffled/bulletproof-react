import { Button } from '../Button';
import { Drawer } from './Drawer';
import { useDisclosure } from '@/hooks/useDisclosure';
const meta = {
    component:  Drawer,
    parameters: {
        controls: { expanded: true }
    },
    title: 'Components/Elements/Drawer'
};
export default meta;
export const Demo = () => {
    const { close, open, isOpen } = useDisclosure();
    return ( <>
        <Button onClick={open}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={close} title="Sample Drawer" size="md" renderFooter={() => ( <>
            <Button variant="inverse" size="sm" onClick={close}>
              Cancel
            </Button>
        </> )}>
        Hello
        </Drawer>
    </> );
};
