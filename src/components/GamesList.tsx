import React from 'react';
import { useSelector } from 'react-redux';
import { Game } from '../api';
import { fetchGames } from '../store/data/actions';
import { useDispatchEffect } from '../utils';
import { NavLink } from 'react-router-dom';

export default function GamesList() {
    const games = useSelector(state => state.data.games);

    useDispatchEffect(dispatch => dispatch(fetchGames()));

    return <ul>
        {games && Object.entries(games).map(([gameId, game]) =>
            <GamesListEntry key={gameId} game={game} />
        )}
    </ul>;
}

function GamesListEntry(props: {
    game: Game;
}) {
    const { game } = props;

    return (
        <li>
            <NavLink to={`/games/${game.jagexName}`}>{game.fancyName}</NavLink>
        </li>
    );
}
