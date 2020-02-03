import React from 'react';
import { formatFractionAsPercentage, formatLargeInteger } from '../shared';
import { PlayerInfo } from '../store/ui/selectors';
import './PlayerInfoDisplay.scss';

export function PlayerInfoDisplay(props: {
    info: PlayerInfo;
}) {
    const { fetching, achievements, maxAchievements, points, maxPoints } = props.info;

    const achievementsPercentage = achievements !== undefined && maxAchievements !== undefined ? formatFractionAsPercentage(achievements, maxAchievements) : '';
    const pointsPercentage = points !== undefined && maxPoints !== undefined ? formatFractionAsPercentage(points, maxPoints) : '';

    return <>
        <div className='player-info-table'>
            <span className='key'>Achievements</span>
            <span className='value simple-progress-bar' title={achievementsPercentage}>
                <span className='bar-content' style={{ width: achievementsPercentage }}></span>
                {achievements !== undefined ? String(achievements) : '?'} / {maxAchievements !== undefined ? formatLargeInteger(maxAchievements) : '?'}
            </span>
            <span className='key'>Orb Points</span>
            <span className='value simple-progress-bar' title={pointsPercentage}>
                <span className='bar-content' style={{ width: pointsPercentage }}></span>
                {points !== undefined ? formatLargeInteger(points) : '?'} / {maxPoints !== undefined ? formatLargeInteger(maxPoints) : '?'}
            </span>
        </div>
        {fetching &&
            <p>Loading...</p>
        }
    </>;
}
