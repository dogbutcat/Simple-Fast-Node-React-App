import * as React from 'react';
import Message from '../components/Message';
import { StatusDoc } from '../../modules/db/StatusDoc';

type MessageListProps = {
    isActiveBackTop: boolean,
    gotoTop: () => void,
    addNewTweet: () => void,
    statuses: StatusDoc[]
};
export default class MessageList extends React.Component<MessageListProps, any>{
    shouldComponentUpdate(nextP: MessageListProps) {
        return nextP.statuses !== this.props.statuses || this.props.isActiveBackTop !== nextP.isActiveBackTop;
    }
    updateNext() {
        this.props.addNewTweet();
    }
    render() {
        let statuses = this.props.statuses ? this.props.statuses : [];
        var children = statuses.map((v, index) => {
            return (<Message key={index} {...v.user} {...v}></Message>)
        })
        return (
            <div className={"messageList"}>
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