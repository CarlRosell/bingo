import React from 'react';
import { render } from 'react-dom';
import Bingo from './Bingo';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numeric: true };
  }

  render() {
    return (
      <div>
        <Bingo />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
