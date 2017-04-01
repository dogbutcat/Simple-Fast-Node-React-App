import * as React from 'react';
import Message from '../components/Message';
import { StatusDoc } from '../../modules/db/StatusDoc';
// interface MessageListProps extends Tweet {
//     LoadComplete: () => void;
//     checkUpdate: () => void;
//     isUpdate: boolean
// }

type MessageListProps = {
    LoadComplete: () => void,
    isActiveBackTop: boolean,
    gotoTop: () => void,
    addNewTweet: () => void,
    statuses: StatusDoc[]
};
export default class MessageList extends React.Component<MessageListProps, any>{
    main: HTMLDivElement;
    loadComplete() {
        this.props.LoadComplete()
    }
    componentWillMount() {
        this.loadComplete()
    }
    // componentDidMount() {
    //     window.addEventListener('scroll', () => this.handleScroll());
    //     // console.log(this.main.getAttribute('class'));
    //     // setTimeout(() => { this.props.checkUpdate() }, 1000);
    // }
    shouldComponentUpdate(nextP: MessageListProps) {
        // return nextP.statuses !== this.props.statuses || !this.state.isActiveBackTop;
        return nextP.statuses !== this.props.statuses || !this.props.isActiveBackTop;
    }
    // componentDidUpdate() {
        // this.props.isUpdate ? this.loadComplete() : void 0;
        // console.log('Component Did Update');
    // }}
    updateNext() {
        // this.props.gotoTop();
        this.props.addNewTweet();
    }
    render() {
        let statuses = this.props.statuses ? this.props.statuses : [];
        var children = statuses.map((v, index) => {
            return (<Message key={index} {...v.user} {...v}></Message>)
        })
        return (
            <div className={"messageList"} ref={(a) => this.main = a} >
                {children}
                <div className={"control " + (this.props.isActiveBackTop ? 'next' : 'hide')} onClick={() => this.updateNext()}>
                    <div className={"icon"}><i className={"fa fa-arrow-right"}></i></div>
                    <div className={"refresh"}>Peek</div>
                </div>
                <div onClick={() => this.props.gotoTop()}><a className={"fa fa-arrow-up " + (this.props.isActiveBackTop ? 'active' : 'hide')} /></div>
            </div>
        )
    }
}