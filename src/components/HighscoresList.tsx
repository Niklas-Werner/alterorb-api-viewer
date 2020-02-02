import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { formatLargeInteger } from '../shared';
import './HighscoresList.scss';

export interface HighscoresListEntry {
    rank?: number;
    name: string;
    score: number;
    highlight?: boolean;
}

export function HighscoresList(props: {
    title: string;
    scoreLabel: string;
    highscores: HighscoresListEntry[];
}) {
    const { title, scoreLabel, highscores } = props;

    return (
        <div className='highscores-list'>
            <h3>{title}</h3>
            <div className='table'>
                <span className='head rank'>Rank</span>
                <span className='head name'>Name</span>
                <span className='head score'>{scoreLabel}</span>
                {highscores.map(({ rank, name, score, highlight }) => <Fragment key={name}>
                    <span className={`rank ${highlight ? 'highlight' : ''}`}>{rank === undefined ? '?' : rank}</span>
                    <span className={`name ${highlight ? 'highlight' : ''}`}><Link to={`/players/${name}`}>{name}</Link></span>
                    <span className={`score ${highlight ? 'highlight' : ''}`}>{formatLargeInteger(score)}</span>
                </Fragment>)}
            </div>
        </div>
    );
}
