import React from 'react';
import shuffleArray from './shuffleArray';
import { createAlphaRange, createNumberRange } from './createRange';
import './Bingo.css';

const BALL_SIZE = {
  ACTIVE: 200,
  DEFAULT: 30
};

const LINE_HEIGHT = BALL_SIZE.DEFAULT + 2;
const ITEM_PER_ROW = 11;

const generateInitialState = ({
  firstNumber,
  lastNumber,
  isNumeric,
  firstLetter,
  lastLetter
}) => {
  debugger;
  const chars = isNumeric
    ? createNumberRange(firstNumber, lastNumber)
    : createAlphaRange(firstLetter, lastLetter);
  return {
    chars,
    shuffledChars: shuffleArray([...chars]),
    usedChars: [],
    currentChar: null,
    firstNumber,
    lastNumber,
    firstLetter,
    lastLetter,
    isNumeric
  };
};

export default class Bingo extends React.Component {
  constructor(props) {
    super(props);
    this.state = generateInitialState({
      firstNumber: 0,
      lastNumber: 20,
      isNumeric: true,
      firstLetter: 'a',
      lastLetter: 'ö'
    });
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
    this.setState(s => generateInitialState({ ...s, usedChars: [] }));
  };

  updateFirstNumber = numberString => {
    const firstNumber = parseInt(numberString, 10) || 0;
    this.setState(s => generateInitialState({ ...s, firstNumber }));
  };

  updateLastNumber = numberString => {
    const lastNumber = parseInt(numberString, 10) || 0;
    this.setState(s => generateInitialState({ ...s, lastNumber }));
  };

  updateFirstLetter = string => {
    const firstLetter =
      string.length > 0 ? [...string][string.length - 1] : 'a';
    this.setState(s => generateInitialState({ ...s, firstLetter }));
  };

  updateLastLetter = string => {
    const lastLetter = string.length > 0 ? [...string][string.length - 1] : 'ö';
    this.setState(s => generateInitialState({ ...s, lastLetter }));
  };

  toggleIsNumeric = () => {
    this.setState(s => {
      console.log(s);
      return generateInitialState({ ...s, isNumeric: !s.isNumeric });
    });
  };

  render() {
    const {
      chars,
      currentChar,
      usedChars,
      firstNumber,
      lastNumber,
      firstLetter,
      lastLetter,
      isNumeric
    } = this.state;
    return (
      <div>
        <div>
          <button
            disabled={chars.length === usedChars.length}
            onClick={this.pickLetter}
          >
            Dra en {isNumeric ? 'siffra' : 'bokstav'}
          </button>
          {isNumeric === true ? (
            <span>
              <input
                type="number"
                onChange={e => this.updateFirstNumber(e.target.value)}
                value={`${firstNumber}`}
              />
              <input
                type="number"
                onChange={e => this.updateLastNumber(e.target.value)}
                value={`${lastNumber}`}
              />
            </span>
          ) : (
            <span>
              <input
                type="text"
                onChange={e => this.updateFirstLetter(e.target.value)}
                value={`${firstLetter}`}
              />
              <input
                type="text"
                onChange={e => this.updateLastLetter(e.target.value)}
                value={`${lastLetter}`}
              />
            </span>
          )}

          <div
            style={{
              position: 'relative',
              height: ITEM_PER_ROW * LINE_HEIGHT + 20
            }}
          >
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
                    animationDirection: ['normal', 'reverse'][index % 2],
                    width:
                      currentChar === char
                        ? `${BALL_SIZE.ACTIVE}px`
                        : `${BALL_SIZE.DEFAULT}px`,
                    marginLeft:
                      currentChar === char
                        ? `-${BALL_SIZE.ACTIVE / 2}px`
                        : `-${BALL_SIZE.DEFAULT / 2}px`,
                    left:
                      usedIndex >= 0
                        ? '95%'
                        : currentChar === char
                          ? '50%'
                          : `${(index * 3) % 10 + 10}%`,
                    transform: `translateX(-${
                      usedIndex >= 0
                        ? `${Math.floor(usedIndex / ITEM_PER_ROW) *
                            LINE_HEIGHT}px`
                        : '0px'
                    })`,
                    zIndex: currentChar === char ? 1 : 0,
                    top:
                      usedIndex >= 0
                        ? `${(usedIndex % ITEM_PER_ROW) * LINE_HEIGHT}px`
                        : currentChar === char ? '50px' : `40%`
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
                        fontSize="20px"
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
        <button onClick={this.toggleIsNumeric}>
          Använd {isNumeric ? 'bokstäver' : 'siffror'}
        </button>
        <button onClick={this.reset}>Börja om</button>
      </div>
    );
  }
}
