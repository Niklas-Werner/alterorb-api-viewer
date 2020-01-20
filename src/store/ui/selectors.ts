import { createSelector } from 'reselect';
import { RootState } from '..';
import { getGames, getPlayerAchievements, getAchievementsData, getPlayersData } from '../data/selectors';

export const getGameDetails = createSelector(
    [getGames, getAchievementsData],
    (games, achievementsData) => {
        if (games === null)
            return null;
        return Object.values(games).map(game => {
            const achievements = achievementsData?.[game.id!]?.data;
            const achievementsInfo = achievements ? {
                count: achievements.length,
                orbPoints: achievements.reduce((acc, achievement) => acc + achievement.orbPoints!, 0),
                orbCoins: achievements.reduce((acc, achievement) => acc + achievement.orbCoins!, 0),
            } : undefined;
            return {
                key: game.jagexName,
                name: game.fancyName,
                achievements: achievementsInfo
            };
        });
    }
);

const getSelectedGameId = (state: RootState) => state.ui.selectedGameId;

const getSelectedGameJagexName = (state: RootState) => state.ui.selectedGameJagexName;

export const getSelectedGame = createSelector(
    [getGames, getSelectedGameId, getSelectedGameJagexName],
    (games, selectedGameId, selectedGameJagexName) => {
        if (games === null)
            return null;
        if (selectedGameId !== undefined)
            return games[selectedGameId] ?? null;
        if (selectedGameJagexName !== undefined)
            return Object.values(games).find(game => game.jagexName === selectedGameJagexName) ?? null;
        return null;
    }
);

export const getSelectedGameAchievementsData = createSelector(
    [getAchievementsData, getSelectedGame],
    (achievementsData, selectedGame) => {
        if (selectedGame === null)
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

export const getSelectedPlayerAchievementsByGame = createSelector(
    [getSelectedPlayerAchievementsData, getGames, getAchievementsData],
    (playerAchievementsData, games, achievementsData) => {
        if (!playerAchievementsData?.data || !games)
            return null;
        const counts: Record<number, number> = {};
        for (const achievement of playerAchievementsData?.data)
            counts[achievement.gameId!] = achievement.gameId! in counts ? counts[achievement.gameId!] + 1 : 0;
        return Object.values(games).map(game => ({
            gameId: game.id!,
            name: game.fancyName!,
            achievements: counts[game.id!] ?? 0,
            totalAchievements: achievementsData?.[game.id!]?.data?.length
        }));
    }
);
