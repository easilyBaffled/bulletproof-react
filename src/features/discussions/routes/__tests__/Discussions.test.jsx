/* eslint-disable max-lines, max-len, max-statements */
import { Discussions } from '../Discussions';
import { discussionGenerator } from '@/test/data-generators';
import { render, screen, userEvent, waitFor, within } from '@/test/test-utils';
import { formatDate } from '@/utils/format';

beforeAll( () => {
    jest.spyOn( console, 'error' ).mockImplementation( () => {});
});
afterAll( () => {
    console.error.mockRestore();
});
test( 'should create, render and delete discussions', async () => {
    await render( <Discussions /> );
    const newDiscussion = discussionGenerator();
    expect( await screen.findByText( /no entries/i ) ).toBeInTheDocument();
    userEvent.click( screen.getByRole( 'button', { name: /create discussion/i }) );
    const drawer = screen.getByRole( 'dialog', {
        name: /create discussion/i
    });
    const titleField = within( drawer ).getByText( /title/i );
    const bodyField = within( drawer ).getByText( /body/i );
    userEvent.type( titleField, newDiscussion.title );
    userEvent.type( bodyField, newDiscussion.body );
    const submitButton = within( drawer ).getByRole( 'button', {
        name: /submit/i
    });
    userEvent.click( submitButton );
    await waitFor( () => expect( drawer ).not.toBeInTheDocument() );
    const row = screen.getByRole( 'row', {
        name: `${newDiscussion.title} ${formatDate(
            newDiscussion.createdAt
        )} View Delete`
    });
    expect(
        within( row ).getByRole( 'cell', {
            name: newDiscussion.title
        })
    ).toBeInTheDocument();
    userEvent.click(
        within( row ).getByRole( 'button', {
            name: /delete/i
        })
    );
    const confirmationDialog = screen.getByRole( 'dialog', {
        name: /delete discussion/i
    });
    const confirmationDeleteButton = within( confirmationDialog ).getByRole(
        'button',
        {
            name: /delete/i
        }
    );
    userEvent.click( confirmationDeleteButton );
    await screen.findByText( /discussion deleted/i );
    expect(
        within( row ).queryByRole( 'cell', {
            name: newDiscussion.title
        })
    ).not.toBeInTheDocument();
});
