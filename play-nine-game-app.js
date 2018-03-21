// paste on https://jscomplete.com/repl/ in the css section
// .mountNode {
//   color: #212121;
// }

// .fa-star {
// 	margin: 0.5em;
//   font-size: 24px;
//   color: #FFC107;
// }

// span {
// 	background-color: #536DFE;
//   color: #FFF;
// 	display: inline-block;
// 	margin: 0.5em;
//   text-align: center;
//   width: 24px;
//   border-radius: 50%;
//   cursor: pointer;
// }

// .selected {
// 	background-color: #BDBDBD;
//   cursor: not-allowed;
// }

// .used {
// 	background-color: #8BC34A;
//   cursor: not-allowed;
// }

// paste on https://jscomplete.com/repl/
var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

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
        <button className="btn btn-outline-success" onClick={props.acceptAnswer}>
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
    <div className="col-2 text-center">
      {button}
      <br/><br/>
      <button
        className="btn btn-sm btn-outline-warning"
        onClick={props.redraw}
        disabled={props.redraws === 0}
      >
        <i className="fa fa-sync"></i>{props.redraws}
      </button>
      </div>
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
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used'
    }
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

const DoneFrame = (props) => {
  return (
    <div className="text-center">
      <h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>
        Play again!
      </button>
    </div>
  );
};

class Game extends React.Component {
  static randomNumber = () => Math.floor(Math.random() * 9) + 1;
  static initialState = () => ({
      numberOfStars: Game.randomNumber(),
      selectedNumbers: [],
      answerIsCorrect: null,
      usedNumbers: [],
      redraws: 5,
      doneStatus: ''
  });
  state = Game.initialState();
  
  selectNumber = (clickNumber) => {
    if (this.state.selectedNumbers.indexOf(clickNumber) < 0) {
      this.setState(prevState => ({
        answerIsCorrect: null,
        selectedNumbers: prevState.selectedNumbers.concat(clickNumber)
      }));
    }
  };
  
  unselectNumber = (clickNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickNumber)
    }));
  };
  
  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((sum, num) => sum + num, 0)
    }));
  };
  
  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber()
    }), this.updateDoneStatus);
  };
  
  redraw = () => {
    if (this.state.redraws === 0) { return; }
    this.setState(prevState => ({
      numberOfStars: Game.randomNumber(),
      selectedNumbers: [],
      answerIsCorrect: null,
      redraws: prevState.redraws - 1
    }), this.updateDoneStatus);
  };
  
  possibleSolutions = ({numberOfStars, usedNumbers}) => {
    const possibleNumbers = _.range(1, 10).filter(
      number => usedNumbers.indexOf(number) === -1
    );
    
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  };
  
  updateDoneStatus = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === 9) {
        return { doneStatus: 'Done!' }
      }
      if (prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
        return { doneStatus: 'Game over!' }
      }
    });
  };
  
  resetGame = () => {
    this.setState(Game.initialState());
  };
  
  render() {
    const {
      numberOfStars,
      selectedNumbers,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state;
    
    return (
      <div className="container">
        <h3 className="text-center">Play Nine</h3>
        <div className="row">
          <Starts numberOfStars={numberOfStars} />
          <Button
            selectedNumbers={selectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answer
            selectedNumbers={selectedNumbers}
            unselectNumber={this.unselectNumber}
          />
        </div>
        <br/>
        {doneStatus ? 
          <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} /> :
          <Numbers
            selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers}
          />
        }
        
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