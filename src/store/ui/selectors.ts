import { createSelector, Selector } from 'reselect';
import { RootState } from '..';
import { PlayerAchievement } from '../../api';
import { compareStrings } from '../../shared';
import { getAchievementsData, getFetchingGames, getGames, getPlayerAchievementsData, getPlayersData } from '../data/selectors';

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
    [getPlayerAchievementsData, getSelectedPlayerData],
    (playerAchievements, selectedPlayerData) => {
        if (!selectedPlayerData?.data)
            return null;
        return playerAchievements[selectedPlayerData.data.uuid!] ?? null;
    }
);

export interface PlayerInfo {
    name: string;
    uuid?: string;
    achievements?: number;
    maxAchievements?: number;
    points?: number;
    maxPoints?: number;
    fetching: boolean;
}

export function createPlayerInfoSelector(nameSelector: Selector<RootState, string | undefined>) {
    return createSelector(
        [getPlayersData, nameSelector, getPlayerAchievementsData, getGames, getFetchingGames],
        (players, name, playerAchievements, games, fetchingGames) => {
            if (!name)
                return null;

            const playerData = players[name] ?? null;
            const achievementsData = playerData?.data ? playerAchievements?.[playerData.data.uuid!] ?? null : null;

            const achievements = achievementsData?.data?.length;
            const maxAchievements = games ? Object.values(games).map(game => game.obtainableAchievements!).reduce((a, b) => a + b) : undefined;
            const maxPoints = games ? Object.values(games).map(game => game.obtainableOrbPoints!).reduce((a, b) => a + b) : undefined;

            const fetching = playerData?.fetching || achievementsData?.fetching || fetchingGames;

            const info: PlayerInfo = {
                name,
                uuid: playerData?.data?.uuid,
                achievements,
                maxAchievements,
                points: playerData?.data?.orbPoints,
                maxPoints,
                fetching
            };
            return info;
        }
    );
}

export const getSelectedPlayerInfo = createPlayerInfoSelector(getSelectedPlayerName);

export const getSelectedPlayerObtinableAchievementsByAvailableGame = createSelector(
    [getSelectedPlayerAchievementsData, getSortedGames],
    (playerAchievementsData, games) => {
        if (!playerAchievementsData?.data || !games)
            return null;
        const counts: Record<number, number> = {};
        for (const achievement of playerAchievementsData?.data)
            counts[achievement.gameId!] = (achievement.gameId! in counts ? counts[achievement.gameId!] : 0) + 1;
        return games
            .filter(game => game.loginEnabled)
            .map(game => ({
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

export const getSelectedPlayerAndGameObtainableAchievementsData = createSelector(
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

        return gameAchievements.data
            .filter(achievement => achievement.obtainable)
            .map<SelectedPlayerAndGameAchievements>(achievement => {
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
