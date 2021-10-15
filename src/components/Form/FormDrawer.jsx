import { Button } from '../Elements/Button';
import { Drawer } from '../Elements/Drawer';
import { useDisclosure } from '@/hooks/useDisclosure';

export const FormDrawer = ({
														 title,
														 children,
														 isDone,
														 triggerButton,
														 submitButton,
														 size = 'md'
													 }) => {
    const { close, open, isOpen } = useDisclosure();
    useEffect( () => {
        if ( isDone ) close();
    }, [ isDone, close ]);
    return (
        <>
            {cloneElement( triggerButton, { onClick: open })}
            <Drawer
                isOpen={isOpen}
                onClose={close}
                title={title}
                size={size}
                renderFooter={() => (
                    <>
                        <Button variant="inverse" size="sm" onClick={close}>
							Cancel
                        </Button>
                        {submitButton}
                    </>
                )}
            >
                {children}
            </Drawer>
        </>
    );
};
