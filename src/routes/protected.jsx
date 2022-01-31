import { Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '@/components/Layout';
import { lazyImport } from '@/utils/lazyImport';

const { DiscussionsRoutes } = lazyImport(
    () => import( '@/features/discussions' ),
    'DiscussionsRoutes'
);
const { Dashboard } = lazyImport( () => import( '@/features/misc' ), 'Dashboard' );
const { Profile } = lazyImport( () => import( '@/features/users' ), 'Profile' );
const { Users } = lazyImport( () => import( '@/features/users' ), 'Users' );
const App = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};
export const protectedRoutes = [
    {
        children: [
            { element: <DiscussionsRoutes />, path: 'discussions/*' },
            { element: <Users />, path: 'users' },
            { element: <Profile />, path: 'profile' },
            { element: <Dashboard />, index: true },
            { element: <Navigate to="." />, path: '*' }
        ],
        element: <App />,
        path:    '/app'
    }
];
