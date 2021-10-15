import { factory, primaryKey } from '@mswjs/data';
const models = {
    comment: {
        authorId:     String,
        body:         String,
        createdAt:    Number,
        discussionId: String,
        id:           primaryKey( String )
    },
    discussion: {
        body:      String,
        createdAt: Number,
        id:        primaryKey( String ),
        teamId:    String,
        title:     String
    },
    team: {
        createdAt:   Number,
        description: String,
        id:          primaryKey( String ),
        name:        String
    },
    user: {
        bio:       String,
        createdAt: Number,
        email:     String,
        firstName: String,
        id:        primaryKey( String ),
        lastName:  String,
        password:  String,
        role:      String,
        teamId:    String
    }
};
export const db = factory( models );
export const loadDb = () =>
    Object.assign( JSON.parse( window.localStorage.getItem( 'msw-db' ) || '{}' ) );
export const persistDb = ( model ) => {
    if ( process.env.NODE_ENV === 'test' ) return;
    const data = loadDb();
    data[ model ] = db[ model ].getAll();
    window.localStorage.setItem( 'msw-db', JSON.stringify( data ) );
};
export const initializeDb = () => {
    const database = loadDb();
    Object.entries( db ).forEach( ([ key, model ]) => {
        const dataEntres = database[ key ];
        if ( dataEntres ) {
            dataEntres?.forEach( ( entry ) => {
                model.create( entry );
            });
        }
    });
};
export const resetDb = () => {
    window.localStorage.clear();
};
initializeDb();
