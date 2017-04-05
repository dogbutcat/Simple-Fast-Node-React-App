import * as React from 'react';
interface LoaderProps {
    isComplete: boolean;
}
export class Loader extends React.Component<LoaderProps, any>{
    render() {
        return (
            <div className={'loader ' + (!this.props.isComplete ? 'active' : '')}>
                <img src="svg/loader.svg" alt="loader" />
            </div>
        )
    }
}