import * as express from 'express';
import * as morgan from 'morgan';
import { SetViewEngine } from './middleware/SetViewEngine';
import { MiddlewareBase } from './middleware/MiddlewareBase';

let app = express();
let port = parseInt(process.env.PORT) || 8000;
app.use(morgan('dev'));
app.disable('etag');
app.use('/', express.static('./public'));
SetViewEngine.handlebars(app);
app.use(MiddlewareBase.configureation);
app.listen(port, () => {
    console.log('Express running on port: '+port);
})
