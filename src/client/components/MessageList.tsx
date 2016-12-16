import * as React from 'react';
import Message, { MessageProps } from './Message';
import { PublicTimeline } from '../../modules/Status';
interface MessageListProps extends PublicTimeline {
    LoadComplete: () => void;
    checkUpdate: () => void;
    isUpdate: boolean
}
export default class MessageList extends React.Component<MessageListProps, any>{
    state = {
        isActiveBackTop: false
    }
    main: HTMLDivElement;
    loadComplete() {
        this.props.LoadComplete()
    }
    componentWillMount() {
        this.loadComplete()
    }
    componentDidMount() {
        window.addEventListener('scroll', () => this.handleScroll());
        // console.log(this.main.getAttribute('class'));
        // setTimeout(() => { this.props.checkUpdate() }, 1000);
    }
    shouldComponentUpdate(nextP: MessageListProps) {
        return nextP.statuses !== this.props.statuses || !this.state.isActiveBackTop;
    }
    componentDidUpdate() {
        this.props.isUpdate ? this.loadComplete() : void 0;
        // console.log('Component Did Update');
    }
    gotoTop() {
        var s = (document.documentElement.scrollTop || document.body.scrollTop || 0), sp = Math.ceil(s / 10), self = this;
        if (s > 2) {
            window.scrollTo(0, s - sp);
            setTimeout(()=>this.gotoTop(), 50)
        }
    }
    handleScroll() {
        var d = document, w = window, self = this;
        var h = Math.max(d.documentElement.clientHeight, w.innerHeight || 0);
        var s = (d.body.scrollTop || d.documentElement.scrollTop || 0);
        // var scrollend = (h + s) > d.body.offsetHeight;
        var scrolled = s > 300;
        scrolled ? this.setState({ isActiveBackTop: true }) : this.setState({ isActiveBackTop: false });
    }
    updateNext() {
        this.gotoTop();
        this.props.checkUpdate();
    }
    render() {
        let statuses = this.props.statuses ? this.props.statuses : [];
        var children = statuses.map((v, index) => {
            var statueFilter: MessageProps = {
                text: v.text,
                created_at: v.created_at,
                name: v.user.name,
                screen_name: v.user.screen_name,
                avatar_large: v.user.avatar_large
            }
            return (<Message key={index} {...statueFilter}></Message>)
        })
        return (
            // <div style={listStyle}>
            <div className={"messageList"} ref={(a) => this.main = a} >
                {children}
                <div className={"control " + (this.state.isActiveBackTop ? 'next' : 'hide')} onClick={() => this.updateNext()}>
                    <div className={"icon"}><i className={"fa fa-arrow-right"}></i></div>
                    <div className={"refresh"}>Peek</div>
                </div>
                <div onClick={() => this.gotoTop()}><a className={"fa fa-arrow-up " + (this.state.isActiveBackTop ? 'active' : 'hide')} /></div>
            </div>
        )
    }
}