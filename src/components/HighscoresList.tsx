import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './HighscoresList.scss';

function formatLargeInteger(num: number) {
    const str = num.toFixed();
    let result = [];
    for (let i = str.length - 1; i >= 0; i -= 3)
        result.unshift(str.substring(Math.max(0, i - 3), i));
    return result.join('\u202f');
}

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
