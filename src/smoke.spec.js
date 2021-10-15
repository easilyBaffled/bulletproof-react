describe( 'vite meta', () => {
    it( 'should have env.VITE_APP_TITLE from .env.development', () => {
        expect( import.meta.env.VITE_API_URL ).to.eqls(
            'https://api.bulletproofapp.com'
        );
    });
});
