import React from 'react';
import { useSelector } from 'react-redux';
import { fetchHighscores } from '../store/data/actions';
import { useActionCreatorEffect } from '../utils';
import { Link } from 'react-router-dom';
import { getHighscores, getFetchingHighscores } from '../store/data/selectors';

export function HighscoresList() {
    const fetchingHighscores = useSelector(getFetchingHighscores);
    const highscores = useSelector(getHighscores);

    useActionCreatorEffect(fetchHighscores);

    if (fetchingHighscores)
        return <p>Fetching highscores list...</p>;

    if (!highscores)
        return <p>No highscores found.</p>;

    return <>
        <ol>
            {highscores.map((entry, index) =>
                <li key={index}>
                    <Link to={`/players/${entry.displayName}`}>{entry.displayName}</Link>: {entry.orbPoints}P
            </li>
            )}
        </ol>
    </>;
}
