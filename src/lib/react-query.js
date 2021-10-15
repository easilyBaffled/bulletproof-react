import { QueryClient } from 'react-query';
const queryConfig = {
    queries: {
        refetchOnWindowFocus: false,
        retry:                false,
        useErrorBoundary:     true
    }
};
export const queryClient = new QueryClient({ defaultOptions: queryConfig });
