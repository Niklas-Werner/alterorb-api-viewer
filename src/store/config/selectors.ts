import { RootState } from '..';

export const getOwnName = (state: RootState) => state.config.ownName;
