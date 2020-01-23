import { createSelector } from 'reselect';
import { RootState } from '..';
import { getGames, getPlayerAchievements, getAchievementsData, getPlayersData, getFetchingGames } from '../data/selectors';
import { compareStrings } from '../../shared';
import { PlayerAchievement } from '../../api';

export const getSortedGames = createSelector(
    [getGames],
    (games) => {
        if (!games)
            return null;
        return Object.values(games).sort((a, b) => compareStrings(a.fancyName!, b.fancyName!));
    }
);

const getSelectedGameJagexName = (state: RootState) => state.ui.selectedGameJagexName;

export const getSelectedGame = createSelector(
    [getGames, getSelectedGameJagexName],
    (games, selectedGameJagexName) => {
        if (!games || !selectedGameJagexName)
            return null;
        return Object.values(games).find(game => game.jagexName === selectedGameJagexName) ?? null;
    }
);

export const getSelectedGameAchievementsData = createSelector(
    [getAchievementsData, getSelectedGame],
    (achievementsData, selectedGame) => {
        if (!selectedGame)
            return null;
        return achievementsData[selectedGame.id!] ?? null;
    }
);

export const getSelectedPlayerName = (state: RootState) => state.ui.selectedPlayerName;

export const getSelectedPlayerData = createSelector(
    [getPlayersData, getSelectedPlayerName],
    (players, selectedPlayerName) => {
        if (!selectedPlayerName)
            return null;
        return players[selectedPlayerName] ?? null;
    }
);

export const getSelectedPlayerAchievementsData = createSelector(
    [getPlayerAchievements, getSelectedPlayerData],
    (playerAchievements, selectedPlayerData) => {
        if (!selectedPlayerData?.data)
            return null;
        return playerAchievements[selectedPlayerData.data.uuid!] ?? null;
    }
);

export interface PlayerInfo {
    name: string;
    achievements?: number;
    maxAchievements?: number;
    points?: number;
    maxPoints?: number;
    fetching: boolean;
}

export const getSelectedPlayerInfo = createSelector(
    [getPlayersData, getSelectedPlayerName, getPlayerAchievements, getGames, getFetchingGames],
    (players, selectedPlayerName, playerAchievements, games, fetchingGames) => {
        if (!selectedPlayerName)
            return null;

        const playerData = players[selectedPlayerName] ?? null;
        const achievementsData = playerData?.data ? playerAchievements?.[playerData.data.uuid!] ?? null : null;

        const achievements = achievementsData?.data?.length;
        const maxAchievements = games ? Object.values(games).map(game => game.obtainableAchievements!).reduce((a, b) => a + b) : undefined;
        const maxPoints = games ? Object.values(games).map(game => game.obtainableOrbPoints!).reduce((a, b) => a + b) : undefined;

        const fetching = playerData?.fetching || achievementsData?.fetching || fetchingGames;

        const info: PlayerInfo = {
            name: selectedPlayerName,
            achievements,
            maxAchievements,
            points: playerData?.data?.orbPoints,
            maxPoints,
            fetching
        };
        return info;
    }
);

export const getSelectedPlayerAchievementsByGame = createSelector(
    [getSelectedPlayerAchievementsData, getSortedGames],
    (playerAchievementsData, games) => {
        if (!playerAchievementsData?.data || !games)
            return null;
        const counts: Record<number, number> = {};
        for (const achievement of playerAchievementsData?.data)
            counts[achievement.gameId!] = achievement.gameId! in counts ? counts[achievement.gameId!] + 1 : 0;
        return games.map(game => ({
            key: game.jagexName!,
            name: game.fancyName!,
            achievements: counts[game.id!] ?? 0,
            totalAchievements: game.obtainableAchievements!
        }));
    }
);

export interface SelectedPlayerAndGameAchievements {
    id: number;
    name: string;
    criteria: string;
    unlocked: boolean;
    unlockTime: string;
}

export const getSelectedPlayerAndGameAchievementsData = createSelector(
    [getSelectedPlayerAchievementsData, getSelectedGame, getSelectedGameAchievementsData],
    (playerAchievements, game, gameAchievements) => {
        if (playerAchievements?.fetching || gameAchievements?.fetching)
            return 'fetching';

        if (!playerAchievements?.data || !game || !gameAchievements?.data)
            return null;

        const playerAchievementsMap = new Map<number, PlayerAchievement>();
        for (const playerAchievement of playerAchievements.data) {
            if (playerAchievement.gameId === game.id)
                playerAchievementsMap.set(playerAchievement.id!, playerAchievement);
        }

        return gameAchievements.data.map<SelectedPlayerAndGameAchievements>(achievement => {
            const playerAchievement = playerAchievementsMap.get(achievement.achievementId!);

            const unlockTime = playerAchievement?.unlockTimestamp ? new Date(playerAchievement.unlockTimestamp).toLocaleString() : '';

            return {
                id: achievement.achievementId!,
                name: achievement.name!,
                criteria: achievement.criteria!,
                unlocked: !!playerAchievement,
                unlockTime
            };
        });
    }
);

export const getSearchPlayerName = (state: RootState) => state.ui.searchPlayerName;

export const getSearchingPlayer = (state: RootState) => state.ui.searchingPlayer;
