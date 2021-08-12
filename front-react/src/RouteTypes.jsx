import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { useTrackedState } from './Provider';

export function PrivateRoute({ component: Component, ...rest }) {
    const { auth } = useTrackedState();
    return (
        <Route {...rest} render={() => auth? <Component /> : <Redirect to="/login" />} />
    );
}

export function PublicRoute({ component: Component, ...rest }) {
    const { auth } = useTrackedState();
    return (
        <Route {...rest} render={() => auth? <Redirect to="/offers" /> : <Component />} />
    );
}