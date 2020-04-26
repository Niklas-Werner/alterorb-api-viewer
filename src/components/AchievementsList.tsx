import React, { Fragment } from 'react';
import { Achievement } from '../api';
import { formatLargeInteger, parenthesize } from '../shared';
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
            {achievements && achievements.map(achievement => {
                const unobtainableClass = achievement.obtainable ? '' : 'unobtainable';
                return (
                    <Fragment key={achievement.achievementId}>
                        <span className={`name ${unobtainableClass}`}>{achievement.name}</span>
                        <span className={`points ${unobtainableClass}`}>{parenthesize(formatLargeInteger(achievement.orbPoints!), !achievement.obtainable)}</span>
                        <span className={`criteria ${unobtainableClass}`}>{achievement.criteria}</span>
                    </Fragment>
                );
            })}
        </div>
    );
}
