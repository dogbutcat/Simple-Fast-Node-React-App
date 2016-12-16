import * as React from 'react';
export interface AvatarProps {
    avatar_large: string;
    screen_name: string; // user name
    name: string; // friendly name
}
export default class Avatar extends React.Component<AvatarProps, any>{
    // context: AvatarContexts;
    render() {
        return (
            <div className={'avatar'}>
                <img src={this.props.avatar_large} alt={this.props.screen_name} />
                <div className={'avatarName'} >
                    <p>{this.props.name}</p>
                </div>
            </div>
        )
    }
}