import * as React from "react";
import Avatar from './Avatar';
import { AvatarProps } from './Avatar';

export type MessageProps = AvatarProps & BodyProps;

export default class Message extends React.Component<MessageProps, any>{
    render() {
        return (
            <div className={'msg'}>
                <Avatar {...this.props}></Avatar>
                <MessageBody {...this.props}></MessageBody>
            </div>
        )
    }
}

interface BodyProps {
    text: string;
    created_at: string;
}
class MessageBody extends React.Component<BodyProps, any>{
    // context: BodyContexts;
    render() {
        return (
            <div className={'msgBody'}>
                <div>
                    <p>{this.props.text}</p>
                </div>
                <div className={'date'}>
                    <p>{this.props.created_at}</p>
                </div>
            </div>
        )
    }
}