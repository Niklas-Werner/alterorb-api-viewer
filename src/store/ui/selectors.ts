import { createSelector } from 'reselect';
import { RootState } from '..';

export const getGames = (state: RootState) => state.data.games;

export const getAchievements = (state: RootState) => state.data.achievements;

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

export const getSelectedGameAchievements = createSelector(
    [getAchievements, getSelectedGame],
    (achievements, selectedGame) => {
        if (achievements === null || selectedGame === null)
            return null;
        return achievements[selectedGame.id!] ?? null;
    }
);

export const getPlayers = (state: RootState) => state.data.players;

export const getPlayerNames = (state: RootState) => state.data.playerNames;

const getSelectedPlayerUuid = (state: RootState) => state.ui.selectedPlayerUuid;

export const getSelectedPlayer = createSelector(
    [getPlayers, getPlayerNames, getSelectedPlayerUuid],
    (players, playerNames, selectedPlayerUuid) => {
        if (selectedPlayerUuid === undefined)
            return null;
        return players[selectedPlayerUuid] ?? null;
    }
);
