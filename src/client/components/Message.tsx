import * as React from "react";
import Avatar from './Avatar';
import { AvatarProps } from './Avatar';

export type MessageProps = {
    Steps?: number
}&AvatarProps & BodyProps;
type MessageState = {
    opacity: number,
    currentSteps: number
}

export default class Message extends React.Component<MessageProps, MessageState>{
    static defaultProps = {
        Steps: 10
    }
    state: MessageState = {
        opacity: 0,
        currentSteps: 0
    }
    private _interval;
    componentDidMount() {
        let self = this;
        this._interval ? clearInterval(this._interval) : this._interval = setInterval(() => {
            self.state.currentSteps > self.props.Steps ? clearInterval(self._interval) : self.setState({
                opacity: self.setOpVal(self.state.currentSteps / self.props.Steps),
                currentSteps: self.state.currentSteps + 1
            })
        }, 50)
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    setOpVal(percent: number) {
        return 1.0 * percent;
    }
    render() {
        let messageStyle: React.CSSProperties = {
            opacity: this.state.opacity
        }
        return (
            <div className={'msg'} style={messageStyle}>
                <Avatar {...this.props}></Avatar>
                <MessageBody {...this.props}></MessageBody>
            </div>
        )
    }
}

interface BodyProps {
    text: string;
    created_at: Date;
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