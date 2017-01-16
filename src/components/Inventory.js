import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      uid: null,
      owner: null
    };
  }
  handleChange(e, key) {
    const fish = this.props.fishes[key];
    this.handleChange = this.handleChange.bind(this);
    const updatedFish = { ...fish, [e.target.name]: [ e.target.value ] };
    this.props.updateFish(key, updatedFish);
  }
  authenticate(name) {
    if(name === 'Github') {
    var provider = new base.auth.GithubAuthProvider();
    }
    else if(name === 'Facebook') {
    var provider = new base.auth.FacebookAuthProvider();
    }
    else if(name === 'Twitter') {
    var provider = new base.auth.TwitterAuthProvider();
    }
    base.auth().signInWithPopup(provider).then( (authData) => {
      console.info(authData);
      const storeRef = base.database().ref(this.props.storeId);
      storeRef.once('value', (snapshot) => {
        const data = snapshot.val() || {};
        if(!data.owner) {
          storeRef.set({
            owner: authData.user.uid
          });
        }
        this.setState({
          uid: authData.user.uid,
          owner: data.owner || authData.user.uid
        });
      });
    }).catch(function(error) {
      console.log(error);
    });
  }
  authHandler(err, authData) {
    console.log(authData);
  }
  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Please Sign in</p>
        <button className="github" onClick={() => this.authenticate('Github')}>
          Log In with se GITHUB!
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate('Facebook')}
        >
          Log In with se facebook!
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate('Twitter')}
        >
          Log In with se twitter!
        </button>
      </nav>
    );
  }
  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">FRESZH</option>
          <option value="unavailable">SOULD OUT</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={e => this.handleChange(e, key)}
        >

        </textarea>
        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  }
  render() {
    const logout = <button> Logout! </button>;
    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry your are not the Owner of THAT STORE 👐 </p>
          {logout}
        </div>
      );
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
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
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default Inventory;
