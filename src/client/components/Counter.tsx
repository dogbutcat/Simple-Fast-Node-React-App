import * as React from 'react';
type CounterState = {
    originValue?: number,
    targetValue?: number,
    currentValue?: number,
    currentStep?: number
}
type CounterProps = {
    Steps?: number,
    TimeInterval?: number,
    CommaBreaker?: boolean,
    Value?: number,
    handleClick?: () => any
}
export default class Counter extends React.Component<CounterProps, CounterState>{
    static defaultProps: CounterProps = {
        Steps: 20,
        TimeInterval: 500,
        CommaBreaker: true
    };
    private _interval;
    state: CounterState = {
        originValue: this.props.Value,
        targetValue: this.props.Value,
        currentValue: this.props.Value,
        currentStep: 0
    }
    componentWillReceiveProps(nextProp: CounterProps) {
        let self = this;
        this.setState({
            targetValue: nextProp.Value,
            currentStep: 0,
            originValue: this.state.currentValue
        })
        if (this._interval)
            clearInterval(this._interval);
        this._interval = setInterval(() => {
            if (self.state.currentStep >= self.props.Steps)
                clearInterval(self._interval);
            self.setState({
                currentValue: self.changeVal(self.state.currentStep / self.props.Steps),
                currentStep: self.state.currentStep + 1
            })
        }, this.props.TimeInterval / this.props.Steps);
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }
    changeVal(percent: number) {
        let diff = this.state.targetValue - this.state.originValue;
        return diff * percent + this.state.originValue;
    }
    seprater(val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    render() {
        let value = Math.round(this.state.currentValue).toString();
        if (this.props.CommaBreaker) {
            value = this.seprater(value);
        }
        return (
            <div className="counter" onClick={() => this.props.handleClick()}>
                <p>There are {value} new Weibo Updated!</p>
            </div>
        )
    }
}