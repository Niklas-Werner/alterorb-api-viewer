import React, { Fragment, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatFractionAsPercentage } from '../shared';
import { getSelectedPlayerName, getSelectedPlayerObtinableAchievementsByAvailableGame } from '../store/ui/selectors';
import './PlayerGamesList.scss';

export function PlayerGamesList(props: PropsWithChildren<{
    contentGameKey?: string;
}>) {
    const { contentGameKey, children } = props;

    const selectedPlayerName = useSelector(getSelectedPlayerName);
    const achievementsByGame = useSelector(getSelectedPlayerObtinableAchievementsByAvailableGame);

    if (!achievementsByGame)
        return null;

    return <div className='player-games-table'>
        <span className='head name'>Game</span>
        <span className='head achievements'>Achieve&shy;ments</span>
        {achievementsByGame.map(({ key, name, achievements, totalAchievements }) =>
            <Fragment key={key}>
                <span className='name'>
                    <Link to={`/players/${selectedPlayerName}/games/${key}`}>{name}</Link>
                </span>
                <span className={`achievements ${totalAchievements > 0 ? 'simple-progress-bar' : ''}`} title={formatFractionAsPercentage(achievements, totalAchievements)}>
                    <span className='bar-content' style={{ width: formatFractionAsPercentage(achievements, totalAchievements) }}></span>
                    {achievements} / {totalAchievements}
                </span>
                {key === contentGameKey &&
                    <div className='content'>
                        {children}
                    </div>
                }
            </Fragment>
        )}
    </div>;
}
