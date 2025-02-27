import { renderHook, act } from '@testing-library/react-hooks';
import { useNotificationStore } from '../notifications';
test( 'should add and remove notifications', () => {
    const { result } = renderHook( () => useNotificationStore() );
    expect( result.current.notifications.length ).toBe( 0 );
    const notification = {
        id:      '123',
        message: 'This is a notification',
        title:   'Hello World',
        type:    'info'
    };
    act( () => {
        result.current.addNotification( notification );
    });
    expect( result.current.notifications ).toContainEqual( notification );
    act( () => {
        result.current.dismissNotification( notification.id );
    });
    expect( result.current.notifications ).not.toContainEqual( notification );
});
