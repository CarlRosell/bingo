import React from 'react';
import { render } from 'react-dom';
import shuffleArray from './shuffleArray';
import './App.css';

const ALL_CHARACTERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const LINE_HEIGHT = 30;

const PICK_DURATION = 0;

const generateInitialState = () => ({
  availableChars: shuffleArray([...ALL_CHARACTERS]),
  usedChars: [],
  currentChar: null,
  picking: false
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = generateInitialState();
  }

  pickLetter = () => {
    const { availableChars, usedChars, currentChar } = this.state;
    this.setState(
      {
        picking: true,
        usedChars: [...usedChars, currentChar].filter(a => a !== null),
        currentChar: null
      },
      () => {
        if (availableChars.length > 0) {
          setTimeout(() => {
            const [newCurrentChar, ...newavailableChars] = availableChars;
            this.setState({
              picking: false,
              currentChar: newCurrentChar,
              availableChars: newavailableChars
            });
          }, PICK_DURATION);
        }
      }
    );
  };

  reset = () => {
    this.setState(generateInitialState());
  };

  render() {
    const { currentChar, usedChars, picking } = this.state;
    return (
      <div>
        <button disabled={picking} onClick={this.pickLetter}>
          Dra en siffra
        </button>
        <button onClick={this.reset}>Börja om</button>
        <div style={{ position: 'relative' }}>
          {ALL_CHARACTERS.map((letter, index) => {
            const usedIndex = usedChars.indexOf(letter);
            return (
              <div
                key={letter}
                className={
                  currentChar === letter || usedIndex >= 0 ? (
                    'ball'
                  ) : (
                    'ball animate'
                  )
                }
                style={{
                  animationDelay: `${2 / ALL_CHARACTERS.length * index}s`,
                  width: currentChar === letter ? '150px' : '30px',
                  left:
                    usedIndex >= 0
                      ? '90%'
                      : currentChar === letter ? '40%' : '5%',
                  top:
                    usedIndex >= 0
                      ? `${usedIndex * LINE_HEIGHT}px`
                      : currentChar === letter ? '50px' : `${LINE_HEIGHT * 3}px`
                }}
              >
                <svg viewBox="0 0 50 50">
                  <g id="UrTavla">
                    <circle
                      fill="teal"
                      stroke="black"
                      strokeWidth="3px"
                      cx="25"
                      cy="25"
                      r="23"
                    />
                    <text
                      fontFamily="Muli, Verdana"
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      fill="white"
                      strokeWidth="1px"
                      fontSize="1.5em"
                      dy=".35em"
                    >
                      {letter}
                    </text>
                  </g>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
