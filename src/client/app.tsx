import * as React from 'react';
import { Loader } from './components/Loader';
import MessageList from './components/MessageList';
import { PublicTimeline } from '../modules/Status';
interface AppProps {
    PublicTimeline
}
interface AppStates {
    isComplete: boolean,
    isLoaded: boolean,
    isUpdate: boolean,
    PublicTimeline
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
    state = {
        isComplete: false,
        isLoaded: false,
        isUpdate: false,
        PublicTimeline: this.props.PublicTimeline
    }
    /**
     *update for load MessageList
     */
    pageLoader() {
        this.setState((prevState) => {
            return {
                isLoaded: true,
                isComplete: false,
                isUpdate: false,
                PublicTimeline: prevState.PublicTimeline
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
                isUpdate: false,
                PublicTimeline: prevState.PublicTimeline
            }
        })
    }
    updateState(data) {
        var cache = JSON.parse(data);
        this.setState({
            isComplete: false,
            isLoaded: false,
            isUpdate: true,
            PublicTimeline: cache
        })
    }
    checkUpdate() {
        var socket = io.connect('/');
        socket.emit('isUpdate');
        socket.on('update', (data) => {
            this.updateState(data.data)
        })
    }
    render() {
        let child = (this.state.isLoaded || this.state.isUpdate) ? (<MessageList {...this.state.PublicTimeline} isUpdate={this.state.isUpdate} LoadComplete={() => this.loadComplete()} checkUpdate={() => this.checkUpdate()} ></MessageList>) : '';
        return (
            <div>
                <Loader isComplete={this.state.isComplete} pageLoader={() => this.pageLoader()}></Loader>
                {child}
            </div>
        )
    }
}