export const initMocks = async () => {
    if ( !!import.meta.env.VITE_API_MOCKING === true ) {
        if ( typeof window === 'undefined' ) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { server } = await import( './server' );

            return server.listen();
        } else {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const { worker } = await import( './browser' );
            // worker.events.on('request:start', (req) => {
            //     console.log(req);
            // });
            // worker.events.on('request:end', (req) => {
            //     console.log(req);
            // });
            return worker.start();
        }
    }
};
