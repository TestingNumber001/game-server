import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, matchRoutes, renderMatches } from 'react-router-dom';
import { App } from './routes';

const root = ReactDOMClient.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);