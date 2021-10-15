import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import { Landing } from '@/features/misc';
import { useAuth } from '@/lib/auth';
export const AppRoutes = () => {
    const auth = useAuth();
    const commonRoutes = [ { element: <Landing />, path: '/' } ];
    const routes = auth.user ? protectedRoutes : publicRoutes;
    const element = useRoutes([ ...routes, ...commonRoutes ]);
    return <>{element}</>;
};
