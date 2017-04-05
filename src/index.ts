import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as morgan from 'morgan';
import { SetViewEngine } from './middleware/SetViewEngine';
import { MiddlewareBase } from './middleware/MiddlewareBase';
import { IntervalAct, Insertion } from './utils/AutoInsertion';
import { RegistSocket } from './utils/RegistSocket';

let app = express();
let port = parseInt(process.env.PORT) || 8000;
app.use(morgan('dev'));
app.disable('etag');
app.use('/', express.static('./public'));
SetViewEngine.handlebars(app);
app.use(MiddlewareBase.configureation);
// app.listen(port, () => {
//     console.log('Express running on port: '+port);
// })
let server = http.createServer(app);
let io = socketIo(server);
server.listen(port, () => {
    console.log('Server running on port: ' + port);
})

if (process.env.SOCKET === 'SERVER' || !process.env.SOCKET) {
    IntervalAct(Insertion, io);
}

if (process.env.SOCKET === 'CLIENT' || !process.env.SOCKET) {
    RegistSocket(io);
}