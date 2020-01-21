import { push } from 'connected-react-router';
import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchGames, fetchPlayer, fetchPlayerAchievements } from '../store/data/actions';
import { getSelectedPlayerData, getSelectedPlayerAchievementsByGame, getSelectedPlayerName, getSelectedPlayerAchievementsData } from '../store/ui/selectors';
import { useDispatchCallback, useDispatchEffect } from '../utils';
import { Layout } from './Layout';

export default function PlayerPage() {
    const selectedPlayerName = useSelector(getSelectedPlayerName);
    const { data: player, fetching: fetchingPlayer } = useSelector(getSelectedPlayerData) ?? {};
    const { fetching: fetchingAchievements } = useSelector(getSelectedPlayerAchievementsData) ?? {};
    const achievementsByGame = useSelector(getSelectedPlayerAchievementsByGame);

    useDispatchEffect(dispatch => {
        if (selectedPlayerName)
            dispatch(fetchPlayer(selectedPlayerName));
        if (player)
            dispatch(fetchPlayerAchievements(player.uuid!));
        dispatch(fetchGames());
    });

    return (
        <Layout title='Players'>
            <PlayerSelector />
            {!selectedPlayerName &&
                <p>No player selected.</p>
            }
            {fetchingPlayer &&
                <p>Fetching player info...</p>
            }
            {player && <>
                {player.displayName}
                <br />
                {player.orbCoins}C
                    <br />
                {player.orbPoints}P
                    <br />
                {fetchingAchievements &&
                    <p>Fetching player achievements...</p>
                }
                {achievementsByGame && <>
                    Achievements:
                        <ul>
                        {achievementsByGame.map(({ gameId, name, achievements, totalAchievements }) => (
                            <li key={gameId}>
                                {name}: {achievements}{totalAchievements !== undefined ? ` / ${totalAchievements}` : ''}
                            </li>
                        ))}
                    </ul>
                </>}
            </>}
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
