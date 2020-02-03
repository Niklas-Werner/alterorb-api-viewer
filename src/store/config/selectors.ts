import { RootState } from '..';
import { createPlayerInfoSelector } from '../ui/selectors';

export const getOwnName = (state: RootState) => state.config.ownName;

export const getOwnPlayerInfo = createPlayerInfoSelector(getOwnName);
