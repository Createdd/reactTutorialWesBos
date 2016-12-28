import React from 'react';

class Storepicker extends React.Component {
  render() {
    return (
        <form className="store-selector">
          <h1>Choose A Store</h1>
          <input type="text" required placeholder="Store Name"/>
          <button type="submit">Visit -></button>
        </form>
    );
  }
}

export default Storepicker;
