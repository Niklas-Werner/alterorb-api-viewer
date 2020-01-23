import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { formatLargeInteger } from '../shared';
import './HighscoresList.scss';

export function HighscoresList(props: {
    title: string;
    scoreLabel: string;
    highscores: [string, number][];
}) {
    const { title, scoreLabel, highscores } = props;

    return (
        <div className='highscores-list'>
            <h3>{title}</h3>
            <div className='table'>
                <span className='head rank'>Rank</span>
                <span className='head name'>Name</span>
                <span className='head score'>{scoreLabel}</span>
                {highscores.map(([name, score], index) => <Fragment key={index}>
                    <span className='rank'>{index + 1}</span>
                    <span className='name'><Link to={`/players/${name}`}>{name}</Link></span>
                    <span className='score'>{formatLargeInteger(score)}</span>
                </Fragment>)}
            </div>
        </div>
    );
}
