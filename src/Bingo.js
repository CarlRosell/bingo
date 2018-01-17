import React from 'react';
import shuffleArray from './shuffleArray';
import createRange from './createRange';
import './Bingo.css';

const LINE_HEIGHT = 30;

const CHARS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'].map(
  a => `${a}${a.toLowerCase()}`
);

const generateInitialState = (firstNumber, lastNumber, isNumeric) => {
  const chars = isNumeric ? createRange(firstNumber, lastNumber) : CHARS;
  return {
    chars,
    shuffledChars: shuffleArray([...chars]),
    usedChars: [],
    currentChar: null,
    firstNumber,
    lastNumber,
    isNumeric
  };
};

export default class Bingo extends React.Component {
  constructor(props) {
    super(props);
    this.state = generateInitialState(0, 20, true);
  }

  pickLetter = () => {
    this.setState(s => {
      const { shuffledChars, usedChars, currentChar } = s;
      const [newCurrentChar, ...newshuffledChars] = shuffledChars;
      return {
        usedChars: [...usedChars, currentChar].filter(a => a !== null),
        currentChar: newCurrentChar,
        shuffledChars: newshuffledChars
      };
    });
  };

  reset = () => {
    this.setState(s =>
      generateInitialState(s.firstNumber, s.lastNumber, s.isNumeric)
    );
  };

  updateFirstNumber = numberString => {
    const number = parseInt(numberString, 10);
    this.setState(s => generateInitialState(number, s.lastNumber, s.isNumeric));
  };

  updateLastNumber = numberString => {
    const number = parseInt(numberString, 10);
    this.setState(s =>
      generateInitialState(s.firstNumber, number, s.isNumeric)
    );
  };

  toggleIsNumeric = () => {
    this.setState(s =>
      generateInitialState(s.firstNumber, s.lastNumber, !s.isNumeric)
    );
  };

  render() {
    const {
      chars,
      currentChar,
      usedChars,
      firstNumber,
      lastNumber,
      isNumeric
    } = this.state;
    return (
      <div>
        <button onClick={this.toggleIsNumeric}>
          Använd {isNumeric ? 'bokstäver' : 'siffror'}
        </button>
        <div>
          <button
            disabled={chars.length === usedChars.length}
            onClick={this.pickLetter}
          >
            Dra en {isNumeric ? 'siffra' : 'bokstav'}
          </button>
          {isNumeric && (
            <span>
              <input
                type="number"
                onChange={e => this.updateFirstNumber(e.target.value)}
                value={firstNumber}
              />
              <input
                type="number"
                onChange={e => this.updateLastNumber(e.target.value)}
                value={`${lastNumber}`}
              />
            </span>
          )}

          <div style={{ position: 'relative' }}>
            {chars.map((char, index) => {
              const usedIndex = usedChars.indexOf(char);
              return (
                <div
                  key={char}
                  className={
                    currentChar === char || usedIndex >= 0
                      ? 'ball'
                      : 'ball animate'
                  }
                  style={{
                    animationDelay: `${2 / chars.length * index}s`,
                    width: currentChar === char ? '150px' : '30px',
                    left:
                      usedIndex >= 0
                        ? '90%'
                        : currentChar === char
                          ? '40%'
                          : `${(index * 4) % 10 + 5}%`,
                    top:
                      usedIndex >= 0
                        ? `${usedIndex * LINE_HEIGHT}px`
                        : currentChar === char ? '50px' : `${LINE_HEIGHT * 3}px`
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
                        {char}
                      </text>
                    </g>
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
        <button
          style={{ position: 'absolute', top: '350px' }}
          onClick={this.reset}
        >
          Börja om
        </button>
      </div>
    );
  }
}
