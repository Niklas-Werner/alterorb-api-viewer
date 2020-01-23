import React, { Fragment } from 'react';
import { SelectedPlayerAndGameAchievements } from '../store/ui/selectors';
import './PlayerAchievementsList.scss';

export function PlayerAchievementsList(props: {
    achievements: SelectedPlayerAndGameAchievements[];
}) {
    const { achievements } = props;

    return (
        <div className='player-achievements-table'>
            <span className='head name'>Achievement</span>
            <span className='head unlocked'>Unlocked</span>
            {achievements && achievements.map(achievement =>
                <Fragment key={achievement.id}>
                    <span className='name' title={achievement.criteria}>
                        {achievement.name}
                    </span>
                    <span className='unlocked' title={achievement.unlockTime}>
                        {achievement.unlocked ? '✔' : '❌'}
                    </span>
                </Fragment>
            )}
        </div>
    );
}
