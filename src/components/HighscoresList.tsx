import React from 'react';
import { useSelector } from 'react-redux';
import { fetchHighscores } from '../store/data/actions';
import { useActionCreatorEffect } from '../utils';

export default function HighscoresList() {
    const highscores = useSelector(state => state.data.highscores);

    useActionCreatorEffect(fetchHighscores);

    if (!highscores)
        return null;

    return <ol>
        {highscores.map((entry, index) =>
            <li key={index}>
                {entry.displayName}: {entry.orbPoints}P
            </li>
        )}
    </ol>;
}
