import React, { Fragment } from 'react';
import { Achievement } from '../api';
import { formatOrbPoints } from '../shared';
import './AchievementsList.scss';

export function AchievementsList(props: {
    achievements: Achievement[];
}) {
    const { achievements } = props;

    return (
        <div className='achievements-table'>
            <span className='head name'>Achievement</span>
            <span className='head points'>Orb Points</span>
            <span className='head criteria'>Criteria</span>
            {achievements && achievements.map(achievement =>
                <Fragment key={achievement.achievementId}>
                    <span className='name'>{achievement.name}</span>
                    <span className='points'>{formatOrbPoints(achievement.orbPoints!)}</span>
                    <span className='criteria'>{achievement.criteria}</span>
                </Fragment>
            )}
        </div>
    );
}
