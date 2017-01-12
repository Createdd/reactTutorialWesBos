import React from 'react';
import { getFunName } from '../helpers'

class Storepicker extends React.Component {
  constructor(){
    super();
    this.goToStore = this.goToStore.bind(this);
  }

  goToStore(event) {
    event.preventDefault();
    console.log(this);
  }

  render() {
    return (
        <form className="store-selector" onSubmit={this.goToStore}>
          <h1>Choose A Store</h1>
          <input type="text" required placeholder="Store Name"
            defaultValue={getFunName()}
            ref={(input) => {this.storeInput = input}} />
          <button type="submit">Visit -></button>
        </form>
    );
  }
}

export default Storepicker;
