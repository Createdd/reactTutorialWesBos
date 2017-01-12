import React from 'react';
import { getFunName } from '../helpers'

class Storepicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    console.log('logging');
  }

  render() {
    return (
        <form className="store-selector" onSubmit={this.goToStore}>
          <h1>Choose A Store</h1>
          <input type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
          <button type="submit">Visit -></button>
        </form>
    );
  }
}

export default Storepicker;
