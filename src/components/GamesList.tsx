import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchGames } from '../store/data/actions';
import { getFetchingGames } from '../store/data/selectors';
import { getGameDetails } from '../store/ui/selectors';
import { useActionCreatorEffect } from '../utils';

export default function GamesList() {
    const fetchingGames = useSelector(getFetchingGames);
    const gameDetails = useSelector(getGameDetails);

    useActionCreatorEffect(fetchGames);

    if (fetchingGames)
        return <p>Fetching games list...</p>;

    if (!gameDetails)
        return <p>No games found.</p>;

    return <ul>
        {gameDetails.map(({ key, name, achievements }) =>
            <li key={key}>
                <NavLink to={`/games/${key}`}>{name}</NavLink>
                {achievements && <>
                    ({achievements.count} achievements, {achievements.orbPoints}P, {achievements.orbCoins}C)
                </>}
            </li>
        )}
    </ul>;
}
