import { StatuseBusiness } from '../business/StatuseBusiness';
import { Insertion, UpdaterAct } from './AutoInsertion';
import { config } from '../resources/config';
export function RegistSocket(IoServer: SocketIO.Server) {
    RetrieveNewStatuses(IoServer);
    GetNewPaging(IoServer);
    LiveUpdater(IoServer);
}

function RetrieveNewStatuses(IoServer: SocketIO.Server) {
    IoServer.of('/').on('connection', (socket) => {
    // IoServer.of('/').use((socket) => {
        socket.on('toUpdate', async () => {
            let _statusBusiness = new StatuseBusiness();
            let result = await _statusBusiness.getStatuses();
            if (!result.error)
                socket.emit('newData', { statuses: result.statuses, objId: result.first_cursor })
        })
    })
}

function GetNewPaging(IoServer: SocketIO.Server) {
    IoServer.of('/').on('connection', (socket) => {
        socket.on('getPaging', async (data) => {
            let objId = data.objId;
            let pageNum = data.pageNum;
            let _statusBusiness = new StatuseBusiness();
            let result = await _statusBusiness.getStatuses(objId, pageNum);
            if (!result.error)
                socket.emit('newPage', { statuses: result.statuses, pagenum: result.current_page });
        })
    })
}

function LiveUpdater(IoServer: SocketIO.Server) {
    UpdaterAct(Insertion, IoServer);
}