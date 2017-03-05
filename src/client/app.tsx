import * as React from 'react';
import { Loader } from './components/Loader';
import MessageList from './components/MessageList';
import { Tweet } from '../modules/local/Tweet';
import { StatusDoc } from '../modules/db/StatusDoc';
import Notification from './components/Notification';
interface AppProps {
    PublicTimeline: Tweet
}
interface AppStates {
    isComplete?: boolean,
    isLoaded?: boolean,
    count?: number,
    isActiveBackTop?: boolean,
    objectId?: string,
    pageNum?: number,
    handleScroll?: () => any,
    PublicTimeline?: StatusDoc[],
    newStatuses?: StatusDoc[]
}
export default class App extends React.Component<AppProps, AppStates>{
    // static childContextTypes = {
    //     PublicTimeline:React.PropTypes.object.isRequired
    // }
    // getChildContext() {
    //     return {
    //         PublicTimeline:this.props.PublicTimeline
    //     }
    // }
    // constructor(props:AppProps) {
    //     super(props);
    //     // this.state = props.PublicTimeline;
    //     this.setState({
    //     isComplete: false,
    //     isLoaded: false,
    //     PublicTimeline:props.PublicTimeline
    // });
    // }
    private _handleScroll = () => this.handleScroll();
    state = {
        isComplete: false,
        isLoaded: false,
        // isUpdate: false,
        count: 0,
        objectId: this.props.PublicTimeline.first_cursor,
        pageNum: 1,
        isActiveBackTop: false,
        PublicTimeline: this.props.PublicTimeline.statuses,
        newStatuses: []
    }
    /**
     *update for load MessageList
     */
    socket: SocketIOClient.Socket;
    componentDidMount() {
        // window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('scroll', this._handleScroll);
        this.socket = io.connect('/');
        this.socket.on('newTweet', (data) => {
            this.showCount(data.count);
        })
        this.socket.on('newPage', async (data) => {
            // console.log(data.statuses.length);
            let _statuses = this.state.PublicTimeline.concat(data.statuses);
            this.setState({
                // PublicTimeline: _statuses.length > 110 ? _statuses.slice(10, 110) : _statuses,
                PublicTimeline: _statuses,
                pageNum: data.pagenum
            })
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
        this.socket.close();
    }
    showCount(num: number) {
        this.setState((preState) => {
            return { count: preState.count + num }
        })
    }
    storeNewStatuses(vals) {
        let _newStatuses = this.state.PublicTimeline;
        _newStatuses = vals.statuses.concat(_newStatuses);
        this.setState({
            PublicTimeline: _newStatuses.slice(0, 20),
            newStatuses: [],
            objectId: vals.objId,
            count: 0,
            pageNum: 2,
            isLoaded: false,
            isComplete: false
        })
    }
    pageLoader() {
        this.setState((prevState: AppStates) => {
            return {
                isLoaded: true,
                isComplete: false,
                // isUpdate: false
                // PublicTimeline: prevState.PublicTimeline
            }
        })
    }
    /**
     *update for Full load
     */
    loadComplete() {
        this.setState((prevState) => {
            return {
                isComplete: true,
                isLoaded: true,
                // isUpdate: false,
                // PublicTimeline: prevState.PublicTimeline
            }
        })
    }
    gotoTop() {
        var s = (document.documentElement.scrollTop || document.body.scrollTop || 0), sp = Math.ceil(s / 10), self = this;
        if (s > 2) {
            window.scrollTo(0, s - sp);
            setTimeout(() => this.gotoTop(), 50)
        }
    }
    addNewTweet() {
        let self = this;
        this.socket.emit('getPaging', { objId: self.state.objectId, pageNum: self.state.pageNum + 1 });
        // if set listener here will cause recursive receive event, it's an error!
        // this.socket.on('newPage', async (data) => {
        //     // console.log(data.statuses.length);
        //     let _statuses = self.state.PublicTimeline.concat(data.statuses);
        //     self.setState({
        //         PublicTimeline: _statuses.length > 100 ? _statuses.slice(10, 110) : _statuses,
        //         pageNum: data.pagenum
        //     })
        // })
    }
    updatePage() {
        this.socket.emit('toUpdate');
        this.socket.on('newData', (data) => {
            this.storeNewStatuses(data);
        })
    }
    handleScroll() {
        let d = document, w = window, self = this;
        let h = Math.max(d.documentElement.clientHeight, w.innerHeight || 0);
        let s = (d.body.scrollTop || d.documentElement.scrollTop || 0);
        // let scrollend = (h + s) > d.body.offsetHeight;
        let scrolled = s > 300;
        scrolled ? this.setState({ isActiveBackTop: true }) : this.setState({ isActiveBackTop: false });
    }
    render() {
        let child = (this.state.isLoaded) ? (<MessageList statuses={this.state.PublicTimeline}
            LoadComplete={() => this.loadComplete()} isActiveBackTop={this.state.isActiveBackTop}
            addNewTweet={() => this.addNewTweet()} gotoTop={() => this.gotoTop()} ></MessageList>) : '';
        let loader = !this.state.isComplete ? (<Loader isComplete={this.state.isComplete} pageLoader={() => this.pageLoader()}></Loader>) : void 0;
        return (
            <div>
                {loader}
                {child}
                <Notification goTop={() => this.gotoTop()} updatePage={() => this.updatePage()} count={this.state.count}></Notification>
            </div>
        )
    }
}