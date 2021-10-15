export const initMocks = async () => {
    if ( !!import.meta.env.VITE_API_MOCKING === true ) {
        if ( typeof window === 'undefined' ) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { server } = await import( './server' );
            server.listen();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { worker } = await import( './browser' );
            worker.start();
        }
    }
};
