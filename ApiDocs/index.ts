import {
    ExpressRequest,
    ExpressResponse,
    ExpressStatic,
} from 'CommonServer/Utils/Express';

import app from 'CommonServer/Utils/StartServer';

import path from 'path';

// Set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Public static files
app.use(ExpressStatic(path.join(__dirname, 'public'), { maxAge: 2592000 }));

app.use(
    '/docs',
    ExpressStatic(path.join(__dirname, 'public'), { maxAge: 2592000 })
);

// Index page
app.get(['/', '/docs'], (_req: ExpressRequest, res: ExpressResponse) => {
    res.render('pages/index');
});

export default app;
