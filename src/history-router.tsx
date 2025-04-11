// https://github.com/salvoravida/redux-first-history/issues/135#issuecomment-2630983477

import { History } from 'history';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export type Props = {
    basename?: string,
    history: History,
    children?: ReactNode,
};

export const HistoryRouter = (props: Props) => {
    const { basename, children, history } = props;
    const [historyState, setHistoryState] = useState({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => {
        history.listen(setHistoryState);
    }, [history]);

    return (
        <Router
            basename={basename}
            location={historyState.location}
            navigationType={historyState.action}
            navigator={history}
        >
            {children}
        </Router>
    );
};
