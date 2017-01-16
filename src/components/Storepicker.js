import React from 'react';
import { getFunName } from '../helpers';

class Storepicker extends React.Component {
  goToStore(event) {
    event.preventDefault();
    const storeId = this.storeInput.value;

    this.context.router.transitionTo(`/store/${storeId}`);
  }

  render() {
    return (
        <form className="store-selector" onSubmit={(e) => {this.goToStore(e);}}>
          <h1>Choose A Store</h1>
          <input type="text" required placeholder="Store Name"
            defaultValue={getFunName()}
            ref={(input) => {this.storeInput = input;}} />
          <button type="submit">Visit -></button>
        </form>
    );
  }
}

Storepicker.contextTypes = {
  router: React.PropTypes.object
};

export default Storepicker;
