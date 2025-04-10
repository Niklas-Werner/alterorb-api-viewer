import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from './store/actions';

export function routeDispatcherComponent(onChange: (dispatch: ThunkDispatch, active: boolean, ...routeParams: (string | undefined)[]) => void) {
    function RouteDispatcher() {
        const dispatch = useDispatch();
        const params = useParams();
        const routeParams = Object.values(params) as (string | undefined)[]

        useEffect(() => {
            onChange(dispatch, true, ...routeParams);
            return () => {
                onChange(dispatch, false, ...routeParams);
            };
        }, [routeParams.join('/')]);

        return null;
    }

    return RouteDispatcher;
}
