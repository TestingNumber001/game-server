import * as React from 'react';
import { matchRoutes, renderMatches, RouteObject, useLocation } from 'react-router-dom';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: (
            <div>
                <h1>Hello World!</h1>
            </div>
        )
    },
    {
        path: '/about',
        element: (
            <div>
                <h1>About</h1>
            </div>
        )
    }
];

export const notFound: RouteObject = {
    path: '*',
    element: (
        <div>Not Found</div>
    )
};

export const App: React.FunctionComponent = function () {
    return renderMatches(matchRoutes([...routes, notFound], useLocation()));
};