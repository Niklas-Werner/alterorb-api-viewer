import { routeDispatcherComponent } from './route-param-dispatcher';
import { selectGame, selectPlayer } from './store/ui/actions';

export const SelectedGameRoute = routeDispatcherComponent((dispatch, active, game) => {
    if (active && game)
        dispatch(selectGame(game));
    else
        dispatch(selectGame(undefined));
});

export const SelectedPlayerRoute = routeDispatcherComponent((dispatch, active, player) => {
    if (active && player)
        dispatch(selectPlayer(player));
    else
        dispatch(selectPlayer(undefined));
});

export const SelectedPlayerAndGameRoute = routeDispatcherComponent((dispatch, active, player, game) => {
    if (active && player)
        dispatch(selectPlayer(player));
    else
        dispatch(selectPlayer(undefined));
    if (active && game)
        dispatch(selectGame(game));
    else
        dispatch(selectGame(undefined));
});
