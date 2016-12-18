import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as morgan from 'morgan';
import * as exphbs from 'express-handlebars';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import * as cookieParser from 'cookie-parser';
import Route from './route';
import { WeiboApi } from './modules/ApiStructure';
import { Loader } from './client/components/Loader';
import { getStatusesAddr } from './resources/GetAddr';
import { ParamFormatGeneric } from './utils/paramsformat';
import { httpRequest, readFile, writeFile } from './utils/promisified-io';
import { PublicTimeline, StatusesBaseParam, PubTimeline } from './modules/Status';
import { AuthorizeParamObj, AuthorizeToken, IToken, IAuthorizeBaseParams, TokenInfo } from './modules/authorize';

interface Tweet {
    PubTimeline,
    Updated: boolean,
    isComplete: boolean
}

let app = express();
app.use(morgan('dev'));
app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');
app.disable('etag');
app.use('/', express.static('./public'));
app.use(cookieParser());
let newTweet: Tweet = {
    PubTimeline: {},
    Updated: false,
    isComplete: true
}

async function getTokenFromFile(filename: string) {
    try {
        let tokenJson = await readFile(filename);
        let token = JSON.parse(tokenJson) as IToken;
        return token.access_token;
    } catch (error) {
        console.log(error);
    }
}

async function getInfo() {
    try {
        newTweet.isComplete = false, newTweet.Updated = false;
        let token = await getTokenFromFile("./token.json");
        let paras = new PubTimeline(token);
        let uri = getStatusesAddr('publicTimeline', paras.params);
        newTweet.PubTimeline = await httpRequest(uri);
        newTweet.Updated = true;
    } catch (error) {
        console.log(error);
    } finally {
        newTweet.isComplete = true;
    }
    // return newTweet;
}

app.get('/OAuth2/callback', Route.getToken)

app.get('/OAuth2/tokeninfo', Route.tokenInfo)

app.use('/:json?', async (req, res, next) => {
    try {
        // let token = await getTokenFromFile("./token.json");
        // let paras = new PubTimeline(token);
        // let uri = getStatusesAddr('publicTimeline', paras.params);
        if (req.params.json !== 'index.json') {
            // let html = ReactDOMServer.renderToString(<Loader isComplete={false}></Loader>)
            res.render('home', { markup: 'html' }, (err, html) => {
                res.send(html);
            })
        } else {
            // Refresh Data on Get Current Content
            setTimeout(() => { newTweet.isComplete ? getInfo() && console.log(new Date().getSeconds()) : console.log('reject'); }, 150);
            res.send(newTweet.PubTimeline);
        }
    } catch (error) {
        // next(error);
        console.error(error);
    }
})

app.use('/hash', (req, res) => {
    res.send(404);
    res.send('4bf4951697eea91d5706aa1f011bbb82');
})

app.use((err, req, res) => {
    err ? console.log(err) : null;
})

let server = http.createServer(app);
let io = socketIo(server);
server.listen(8000, (err) => {
    err ? console.log(err) : console.log('Express with Socket running on port: 8000');
})
// Initial Data
setTimeout(() => { newTweet.isComplete ? getInfo() && console.log(new Date().getSeconds()) : console.log('reject'); }, 50);
io.on('connection', (socket) => {
    // console.log(socket.request.headers.referer);
    // Refresh Data On Peek Another Page
    setTimeout(() => { newTweet.isComplete ? getInfo() && console.log(new Date().getSeconds()) : console.log('reject'); }, 1000);
    socket.on('isUpdate', () => {
        newTweet.Updated ? socket.emit('update', { data: newTweet.PubTimeline }) && (newTweet.Updated = false) : void 0;
    })
})