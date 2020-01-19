import React from 'react';
import { useSelector } from 'react-redux';
import { fetchHighscores } from '../store/data/actions';
import { useActionCreatorEffect } from '../utils';
import { Link } from 'react-router-dom';

export default function HighscoresList() {
    const highscores = useSelector(state => state.data.highscores);

    useActionCreatorEffect(fetchHighscores);

    if (!highscores)
        return null;

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
