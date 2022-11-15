import * as fs from 'node:fs';
import * as path from 'node:path';

import * as express from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { matchRoutes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { App, routes } from './client/routes';

const app = express();

app.use(express.json());

app.get('/static/:source', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const { source } = req.params;
    const stream: fs.ReadStream = fs.createReadStream(path.resolve('static', source));

    stream.on('ready', function () {
        return stream.pipe(res);
    });

    stream.on('error', function (err) {
        next();
    });
});

app.get('*', function (req: express.Request, res: express.Response, next: express.NextFunction) {
    const document: React.ReactNode = (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <link rel="stylesheet" href="/static/style.css" />
                <script src="/static/index.bundle.js" async />
            </head>
            <body>
                <div id="root">
                    <StaticRouter location={req.path}>
                        <App />
                    </StaticRouter>
                </div>
            </body>
        </html>
    );

    const stream: ReactDOMServer.PipeableStream = ReactDOMServer.renderToPipeableStream(document);
    return stream.pipe(res).status(matchRoutes(routes, req.path) ? 200: 404);
});

app.listen(3000, function () {
    console.log('Server listening on port 3000.');
}); 