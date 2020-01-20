import { RootState } from '..';

export const getFetchingGames = (state: RootState) => state.data.games.fetching;
export const getGames = (state: RootState) => state.data.games.data;

export const getAchievementsData = (state: RootState) => state.data.achievements;

export const getFetchingHighscores = (state: RootState) => state.data.highscores.fetching;
export const getHighscores = (state: RootState) => state.data.highscores.data;

export const getPlayersData = (state: RootState) => state.data.players;

export const getPlayerAchievements = (state: RootState) => state.data.playerAchievements;
