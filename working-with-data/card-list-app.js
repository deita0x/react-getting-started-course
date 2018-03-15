// paste on https://jscomplete.com/repl/

const Card = (props) => {
	return (
    <div style={{ margin: '1em' }}>
      <img src={props.avatar_url} style={{ height: '80px', borderRadious: '40px' }} />
      <div style={{ display: 'inline-block', paddingLeft: '10px' }}>
        <div style={{ fontSize: '18px', color: '#adadad' }}>
          {props.name}
        </div>
        <div style={{ fontSize: '14px', color: '#bfbfbf' }}>
          {props.company}
        </div>
      </div>
    </div>
  );
};

const CardList = (props) => {
	return (
    <div>
      {props.cards.map(card => <Card key={card.id} {...card} />)}
    </div>
  );
}

class Form extends React.Component {
	state = { userName: '' };
  
	handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://api.github.com/users/${this.state.userName}`)
      .then((response) => {
        this.props.onSubmit(response.data);
        this.setState({ userName: '' });
      });
  };
  
  updateUserName = (event) => {
    this.setState({ userName: event.target.value });
  };

	render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Github user"
          value={this.state.userName}
          onChange={this.updateUserName}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

class App extends React.Component {
	state = { cards: [] };
  
  addNewCard = (card) => {
    this.setState(prevState => ({ cards: prevState.cards.concat(card) }));
  };
  
	render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard} />
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);