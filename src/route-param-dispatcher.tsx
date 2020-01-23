import React from 'react';
import { connect, ConnectedProps, shallowEqual } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { RootState } from './store';
import { ThunkDispatch } from './store/actions';

interface Options {
    onChange?: (dispatch: ThunkDispatch, active: boolean, ...routeParams: (string | undefined)[]) => void;
    onEnter?: (dispatch: ThunkDispatch, ...routeParams: (string | undefined)[]) => void;
    onUpdate?: (dispatch: ThunkDispatch, ...routeParams: (string | undefined)[]) => void;
    onLeave?: (dispatch: ThunkDispatch, ...routeParams: (string | undefined)[]) => void;
}

interface Props {
    path: string;
    exact?: boolean;
}

export function routeDispatcherComponent({ onChange, onEnter, onUpdate, onLeave }: Options): React.FunctionComponent<Props>;
export function routeDispatcherComponent(onChange: Options['onChange']): React.FunctionComponent<Props>;
export function routeDispatcherComponent(optionsOrOnChange: Options | Options['onChange']) {
    const options = typeof optionsOrOnChange === 'object' ? optionsOrOnChange : { onChange: optionsOrOnChange };
    const { onChange, onEnter, onUpdate, onLeave } = options;

    const connector = connect(
        (state: RootState, ownProps: RouteComponentProps<any>) => ({
            routeParams: Object.values(ownProps.match.params) as (string | undefined)[]
        }),
        dispatch => ({ dispatch })
    );

    const RouteDispatcher = class extends React.Component<ConnectedProps<typeof connector>, {
        routeParams: (string | undefined)[];
    }> {
        constructor(props: ConnectedProps<typeof connector>) {
            super(props);

            this.state = {
                routeParams: props.routeParams
            };
        }

        componentDidMount() {
            if (onEnter)
                onEnter(this.props.dispatch, ...this.props.routeParams);
            if (onChange)
                onChange(this.props.dispatch, true, ...this.props.routeParams);
        }

        componentDidUpdate() {
            if (!shallowEqual(this.props.routeParams, this.state.routeParams)) {
                if (onUpdate)
                    onUpdate(this.props.dispatch, ...this.props.routeParams);
                if (onChange)
                    onChange(this.props.dispatch, true, ...this.props.routeParams);
                this.setState({
                    routeParams: this.props.routeParams
                });
            }
        }

        componentWillUnmount() {
            if (onLeave)
                onLeave(this.props.dispatch, ...this.props.routeParams);
            if (onChange)
                onChange(this.props.dispatch, false, ...this.props.routeParams);
        }

        render() {
            return null;
        }
    };

    const Connected = connector(RouteDispatcher);

    return ({ path, exact }: { path: string; exact?: boolean; }) => {
        return <Route exact={exact} path={path} component={Connected} />
    };
}
