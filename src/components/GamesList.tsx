import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchGames } from '../store/data/actions';
import { getFetchingGames, getGames } from '../store/data/selectors';
import { useActionCreatorEffect } from '../utils';

export default function GamesList() {
    const fetchingGames = useSelector(getFetchingGames);
    const games = useSelector(getGames);

    useActionCreatorEffect(fetchGames);

    if (fetchingGames)
        return <p>Fetching games list...</p>;

    if (!games)
        return <p>No games found.</p>;

    return <ul>
        {Object.values(games).map(game =>
            <li key={game.jagexName}>
                <NavLink to={`/games/${game.jagexName}`}>{game.fancyName}</NavLink>
                {` (${game.obtainableAchievements} achievements, ${game.obtainableOrbPoints}P, ${game.obtainableOrbCoins}C)`}
            </li>
        )}
    </ul>;
}
