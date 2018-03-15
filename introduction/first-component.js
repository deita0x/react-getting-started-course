class Button extends React.Component {
    state = { counter: 0 };

    incrementCounter = () => {
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }));
    };

    render() {
        return (
            <button onClick={this.incrementCounter}>
                {this.state.counter}
            </button>
        );
    }
}

ReactDOM.render(<Button />, mountNode);