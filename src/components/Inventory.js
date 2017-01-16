import React from 'react';
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  constructor(){
    super();
    this.renderInventory = this.renderInventory.bind(this);
  }
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    this.handleChange = this.handleChange.bind(this);
    const updatedFish = {
      ...fish,
      [e.target.name]: [e.target.value]
    };
    this.props.updateFish(key, updatedFish);
  }
  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Please Sign in</p>
        <button className="github" onClick={() => this.authenticate('github')}>
          Log In with se GITHUB!
        </button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>
          Log In with se facebook!
        </button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>
          Log In with se twitter!
        </button>
      </nav>
    );
  }
  renderInventory(key){
    const fish = this.props.fishes[key];
    return(
      <div className="fish-edit" key={key}>
        <input type='text' name='name' value={fish.name} placeholder='Fish Name'
          onChange={(e) => this.handleChange(e, key)} />
        <input type='text' name='price' value={fish.price} placeholder='Fish Price' onChange={(e) => this.handleChange(e, key)}/>
          <select name='status' value={fish.status} placeholder='Fish Status' onChange={(e) => this.handleChange(e, key)} >
            <option value='available'>FRESZH</option>
            <option value='unavailable'>SOULD OUT</option>
          </select>
        <textarea type='text' name='desc' value={fish.desc} placeholder='Fish Desc' onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type='text' name='image' value={fish.image} placeholder='Fish Image' onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h2>Inventory</h2>
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fish</button>
      </div>
    );
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired
};

export default Inventory;
