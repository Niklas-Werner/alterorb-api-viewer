import { routeDispatcherComponent } from '../route-param-dispatcher';
import { selectGame, selectPlayer, setSelectedPlayer } from '../store/ui/actions';

export const SelectedGameRoute = routeDispatcherComponent((dispatch, active, routeParam) => {
    if (active && routeParam)
        dispatch(selectGame(routeParam));
    else
        dispatch(selectGame(undefined));
});

export const SelectedPlayerRoute = routeDispatcherComponent((dispatch, active, routeParam) => {
    if (active && routeParam)
        dispatch(selectPlayer(routeParam, 'name'));
    else
        dispatch(setSelectedPlayer(undefined));
});