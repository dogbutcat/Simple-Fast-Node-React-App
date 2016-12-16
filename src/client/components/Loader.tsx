import * as React from 'react';
interface LoaderProps {
    isComplete: boolean;
    pageLoader: () => void;
}
export class Loader extends React.Component<LoaderProps, any>{
    componentDidMount() {
        var self = this;
        setTimeout(function () {
            self.props.pageLoader();
        }, 1000);
    }
    render() {
        return (
            <div className={'loader ' + (!this.props.isComplete ? 'active' : '')}>
                <img src="svg/loader.svg" alt="loader" />
            </div>
        )
    }
}