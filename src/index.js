import React from 'react';
import { render } from 'react-dom';
import Bingo from './Bingo';
import createRange from './createRange';

const NUMBERS = createRange(0, 20);

const CHARS = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'].map(
  a => `${a}${a.toLowerCase()}`
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numeric: true };
  }

  render() {
    const { numeric } = this.state;
    return (
      <div>
        <Bingo chars={numeric ? NUMBERS : CHARS} isNumeric={numeric} />
        <button
          style={{ position: 'absolute', top: '400px' }}
          onClick={() => this.setState(state => ({ numeric: !state.numeric }))}
        >
          Använd {numeric ? 'bokstäver' : 'siffror'}
        </button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
