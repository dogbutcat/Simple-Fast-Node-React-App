import * as React from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components/Loader';
import MessageList from './MessageList';
import { StatusDoc } from '../../modules/db/StatusDoc';
import Notification from './Notification';
import { MainState } from '../constants/Tweet';
import { fetchPosts, Scrolled, receivePage, recvNotification, recvCount } from '../actions/TweetAction';
type StateProps = {
    Posts: StatusDoc[],
    isComplete: boolean,
    isLoaded: boolean,
    count: number,
    objectId: string,
    pageNum: number,
    isActiveBackTop: boolean
}
type DispatchProps = {
    fetchPosts,
    Scrolled,
    receivePage,
    recvNotification,
    recvCount
}
type AppProps = StateProps & DispatchProps;

type AppStates = {
    isComplete?: boolean,
    isLoaded?: boolean,
    count?: number,
    isActiveBackTop?: boolean,
    objectId?: string,
    pageNum?: number,
    handleScroll?: () => any,
    Posts?: StatusDoc[]
}
export class App extends React.Component<AppProps, any>{
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
    /**
     *update for load MessageList
     */
    socket: SocketIOClient.Socket;
    componentDidMount() {
        // window.addEventListener('scroll', () => this.handleScroll());
        // Dispatch fetch Posts
        const { fetchPosts, receivePage, recvCount } = this.props
        setTimeout(fetchPosts, 1000);
        window.addEventListener('scroll', this._handleScroll);
        this.socket = io.connect('/');
        this.socket.on('newTweet', (data) => {
            recvCount(data);
        })
        this.socket.on('newPage', async (data) => {
            receivePage(data);
        })
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this._handleScroll);
        this.socket.close();
    }
    gotoTop() {
        var s = (document.documentElement.scrollTop || document.body.scrollTop || 0), sp = Math.ceil(s / 10), self = this;
        if (s > 2) {
            window.scrollTo(0, s - sp);
            setTimeout(() => this.gotoTop(), 50)
        }
    }
    addNewTweet() {
        const { objectId, pageNum } = this.props;
        this.socket.emit('getPaging', { objId: objectId, pageNum: pageNum + 1 });

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
    /**
     * After click Peek
     */
    updatePage() {
        const { recvNotification, recvCount } = this.props
        this.socket.emit('toUpdate');
        this.socket.on('newData', (data) => {
            recvCount({ count: 0 });
            recvNotification(data);
        })
    }
    handleScroll() {
        let d = document, w = window, self = this;
        let h = Math.max(d.documentElement.clientHeight, w.innerHeight || 0);
        let s = (d.body.scrollTop || d.documentElement.scrollTop || 0);
        // let scrollend = (h + s) > d.body.offsetHeight;
        let scrolled = s > 300;
        const { Scrolled } = this.props
        scrolled ? Scrolled(true) : Scrolled(false);
    }
    render() {
        const { Posts, isActiveBackTop, isComplete, count } = this.props
        let child = (Posts.length > 0) ? (<MessageList statuses={Posts}
            isActiveBackTop={isActiveBackTop} addNewTweet={() => this.addNewTweet()}
            gotoTop={() => this.gotoTop()} ></MessageList>) : '';
        let loader = !isComplete ? (<Loader isComplete={isComplete} ></Loader>) : void 0;
        return (
            <div>
                {loader}
                {child}
                <Notification goTop={() => this.gotoTop()} updatePage={() => this.updatePage()} count={count}></Notification>
            </div>
        )
    }
}

export default connect<StateProps, DispatchProps, any>(mapStateToProps, mapDispatchToProps)(App)

function mapStateToProps(state: MainState): StateProps {
    const { TweetShower } = state;
    const { Posts, isActiveBackTop, count, objectId, pageNum, isComplete, isLoaded } = TweetShower;
    return {
        Posts: TweetShower.Posts,
        isComplete: isComplete,
        isLoaded: isLoaded,
        isActiveBackTop: isActiveBackTop,
        count: count,
        objectId: objectId,
        pageNum: pageNum
    }
}

function mapDispatchToProps(dispatch): DispatchProps {
    return {
        fetchPosts: () => dispatch(fetchPosts()),
        Scrolled: isScroll => dispatch(Scrolled(isScroll)),
        receivePage: data => dispatch(receivePage(data)),
        recvNotification: data => dispatch(recvNotification(data)),
        recvCount: data => dispatch(recvCount(data))
    }
}