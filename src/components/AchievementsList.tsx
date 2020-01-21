import React from 'react';
import { Achievement } from '../api';

export function AchievementsList(props: {
    achievements: Achievement[];
}) {
    const { achievements } = props;

    return <ul>
        {achievements && achievements.map(achievement =>
            <li key={achievement.achievementId}>
                {achievement.name}: {achievement.orbCoins}C {achievement.orbPoints}P {achievement.criteria}
            </li>
        )}
    </ul>;
}
