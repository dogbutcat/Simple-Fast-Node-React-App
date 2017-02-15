import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';

export class SetViewEngine{
    static handlebars(app:express.Application,viewPath:string='views') {
        app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
        app.set('view engine', 'handlebars');
        app.set('views', path.resolve(process.cwd(), viewPath));
    }
}