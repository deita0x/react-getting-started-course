const Starts = (props) => {
  let stars = [];
  
  for (let i = 0; i < props.numberOfStars; i++ ) {
  	stars.push(<i className="fa fa-star"></i>);
  }
  
	return (
  	<div className="col-5">{stars}</div>
  );
};

const Button = (props) => {
	let button;
  
  switch(props.answerIsCorrect) {
  	case true:
    	button =
      	<button className="btn btn-outline-success">
      		<i className="fa fa-check"></i>
      	</button>
    	break;
    case false:
    	button =
      	<button className="btn btn-outline-danger">
      		<i className="fa fa-times"></i>
      	</button>
    	break;
    default:
    	button =
      	<button
        	className="btn btn-outline-primary"
          onClick={props.checkAnswer}
          disabled={!props.selectedNumbers.length}
        >
      		=
      	</button>
    	break;
  }
	return (
  	<div className="col-2">{button}</div>
  );
};

const Answer = (props) => {
	return (
  	<div className="col-5">
    	{props.selectedNumbers.map((number, index) =>
      	<span key={index} onClick={() => props.unselectNumber(number)}>{number}</span>
      )}
    </div>
  );
};

const Numbers = (props) => {
	const getClassName = (number) => {
  	if (props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected'
    }
  };
  
	return (
  	<div className="card text-center">
    	<div>
      	{Numbers.list.map((number, index) =>
        	<span 
          	key={index}
            className={getClassName(number)}
            onClick={() => props.selectNumber(number)}
          >
      			{number}
      		</span>
        )}
    	</div>
  	</div>
  );
}

Numbers.list = _.range(1, 9);

class Game extends React.Component {
	state = {
  	numberOfStars: Math.floor(Math.random() * 9) + 1,
  	selectedNumbers: [],
    answerIsCorrect: null
  };
  
  selectNumber = (clickNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickNumber) < 0) {
    	this.setState(prevState => ({
    		selectedNumbers: prevState.selectedNumbers.concat(clickNumber)
    	}));
    }
  };
  
  unselectNumber = (clickNumber) => {
  	this.setState(prevState => ({
    	selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickNumber)
    }));
  };
  
  checkAnswer = () => {
  	console.log('checkAnswer');
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((sum, num) => sum + num, 0)
    }));
  };
  
	render() {
  	const { numberOfStars, selectedNumbers, answerIsCorrect } = this.state;
    
  	return (
    	<div className="container">
    	  <h3 className="text-center">Play Nine</h3>
        <div className="row">
        	<Starts numberOfStars={numberOfStars} />
        	<Button
          	selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
          />
        	<Answer
          	selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <Numbers
        	selectedNumbers={selectedNumbers}
          selectNumber={this.selectNumber}
        />
    	</div>
    );
  }
}

class App extends React.Component {  
	render() {
  	return (
    	<div>
  	  	<Game />
  		</div>
    );
  }
}

ReactDOM.render(<App />, mountNode);