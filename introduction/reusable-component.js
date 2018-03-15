// paste on https://jscomplete.com/repl/

class Button extends React.Component {
  handleClick = () => {
    this.props.onClickIncrement(this.props.incrementValue);
  };
  
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.props.incrementValue}
      </button>
    );
  }
}

class Result extends React.Component {
  render() {
    return (
      <div>{this.props.counter}</div>
    );
  }
}

class App extends React.Component {
  state = { counter: 10 };
  
  incrementCounter = (incrementValue) => {
    this.setState((prevState) => ({
      counter: prevState.counter + incrementValue
    }));
  };
  
  render() {
    return (
      <div>
      <Button incrementValue={2} onClickIncrement={this.incrementCounter} />
      <Button incrementValue={5} onClickIncrement={this.incrementCounter} />
      <Button incrementValue={10} onClickIncrement={this.incrementCounter} />
      <Result counter={this.state.counter} />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);