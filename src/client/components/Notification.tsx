import * as React from 'react';
import Counter from './Counter';

export type NotificationProp = {
    count: number,
    updatePage: () => any,
    goTop: () => any
}
export default class Notification extends React.Component<NotificationProp, any>{
    getNew() {
        this.props.updatePage();
        this.props.goTop();
    }
    render() {
        let count = this.props.count;
        return (
            <div className={"notification-bar" + (count ? " active" : '')}>
                <Counter Value={count} handleClick={()=>this.getNew()}></Counter>
                {/*<div><a onClick={() => this.getNew()}>Click Here to Update.</a></div>*/}
            </div>
        )
    }
}