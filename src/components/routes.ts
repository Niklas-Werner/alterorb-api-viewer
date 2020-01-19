import { routeDispatcherComponent } from '../route-param-dispatcher';
import { selectGame } from '../store/ui/actions';

export const SelectedGameRoute = routeDispatcherComponent((dispatch, active, routeParam) => {
    if (active && routeParam)
        dispatch(selectGame(routeParam));
    else
        dispatch(selectGame(undefined));
});
