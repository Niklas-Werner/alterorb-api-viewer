import { createSelector } from 'reselect';
import { RootState } from '..';

export const getGames = (state: RootState) => state.data.games;

export const getAchievements = (state: RootState) => state.data.achievements;

export const getSelectedGameId = (state: RootState) => state.ui.selectedGameId;

export const getSelectedGameJagexName = (state: RootState) => state.ui.selectedGameJagexName;

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

export const getSelectedGameAchievements = createSelector(
    [getAchievements, getSelectedGame],
    (achievements, selectedGame) => {
        if (achievements === null || selectedGame === null)
            return null;
        return achievements[selectedGame.id!] ?? null;
    }
);
