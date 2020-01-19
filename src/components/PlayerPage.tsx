import { push } from 'connected-react-router';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getSelectedPlayer } from '../store/ui/selectors';
import { useDispatchCallback } from '../utils';
import { Layout } from './Layout';

export default function PlayerPage() {
    const selectedPlayer = useSelector(getSelectedPlayer);

    return (
        <Layout title='Players'>
            <PlayerSelector />
            {selectedPlayer &&
                <p>
                    {selectedPlayer.displayName}
                    <br />
                    {selectedPlayer.orbCoins}C
                    <br />
                    {selectedPlayer.orbPoints}P
                </p>
            }
        </Layout>
    );
}

function PlayerSelector() {
    const inputRef = useRef<HTMLInputElement>(null);

    const goCallback = useDispatchCallback((dispatch, ev: React.FormEvent) => {
        if (!inputRef.current)
            return;
        const name = inputRef.current.value;
        inputRef.current.value = '';
        dispatch(push(`/players/${name}`));
        ev.preventDefault();
    }, []);

    return (
        <form onSubmit={goCallback}>
            <input type='text' ref={inputRef} />
            <button type='submit'>Go</button>
        </form>
    );
}
