import React, { ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { searchPlayer, updateSearchPlayerName } from '../store/ui/actions';
import { getSearchPlayerName, getSearchingPlayer } from '../store/ui/selectors';
import { useDispatchCallback } from '../utils';

export function SearchPlayerForm() {
    const name = useSelector(getSearchPlayerName);
    const searching = useSelector(getSearchingPlayer);

    const updateNameCallback = useDispatchCallback((dispatch, ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateSearchPlayerName(ev.target.value));
    }, []);

    const searchCallback = useDispatchCallback((dispatch, ev: FormEvent) => {
        dispatch(searchPlayer());
        ev.preventDefault();
    }, []);

    return (
        <form onSubmit={searchCallback} className='search-player-form'>
            <input type='text' value={name} onChange={updateNameCallback} disabled={searching} placeholder='Name' />
            <button type='submit' disabled={searching || !name}>
                {searching ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
}
