import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router';
import { RootState } from './store';
import { ThunkDispatch } from './store/actions';

interface Options {
    onChange?: (dispatch: ThunkDispatch, active: boolean, routeParam?: string) => void;
    onEnter?: (dispatch: ThunkDispatch, routeParam?: string) => void;
    onUpdate?: (dispatch: ThunkDispatch, routeParam?: string) => void;
    onLeave?: (dispatch: ThunkDispatch, routeParam?: string) => void;
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
            routeParam: Object.values(ownProps.match.params)[0] as string | undefined
        }),
        dispatch => ({ dispatch })
    );

    const RouteDispatcher = class extends React.Component<ConnectedProps<typeof connector>, {
        routeParam?: string;
    }> {
        constructor(props: ConnectedProps<typeof connector>) {
            super(props);

            this.state = {
                routeParam: props.routeParam
            };
        }

        componentDidMount() {
            if (onEnter)
                onEnter(this.props.dispatch, this.props.routeParam);
            if (onChange)
                onChange(this.props.dispatch, true, this.props.routeParam);
        }

        componentDidUpdate() {
            if (this.props.routeParam !== this.state.routeParam) {
                if (onUpdate)
                    onUpdate(this.props.dispatch, this.props.routeParam);
                if (onChange)
                    onChange(this.props.dispatch, true, this.props.routeParam);
                this.setState({
                    routeParam: this.props.routeParam
                });
            }
        }

        componentWillUnmount() {
            if (onLeave)
                onLeave(this.props.dispatch, this.props.routeParam);
            if (onChange)
                onChange(this.props.dispatch, false, this.props.routeParam);
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
