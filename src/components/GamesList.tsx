import React from 'react';
import { useSelector } from 'react-redux';
import { fetchGames } from '../store/games/actions';
import { useDispatchEffect } from '../utils';

export default function GamesList() {
    const games = useSelector(state => state.games.games);

    useDispatchEffect(dispatch => dispatch(fetchGames()), []);

    return <ul>
        {games.map(game =>
            <li key={game.id}>
                {game.id}: {game.jagexName} {game.prettyName}
            </li>
        )}
    </ul>;
}
