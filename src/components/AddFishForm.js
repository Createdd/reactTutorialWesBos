import React from 'react';

class AddFishForm extends React.Component {
  createFish(event) {
    event.preventDefault();
    console.log('Make fish 🐟');
    const fish = {
      name: this.name.value,
      price: this.price.value,
      status: this.status.value,
      desc: this.desc.value,
      image: this.image.value,
    };
    console.log(fish);
  }

  render() {
    return (
      <form className="fish-edit" onSubmit={ (e) => this.createFish(e)}>
        <input ref={(input) => this.name = input} type='text' placeholder='Fish Name'/>
        <input ref={(input) => this.price = input} type='text' placeholder='Fish Price'/>
        <select ref={(input) => this.status = input} >
          <option value='available'>FRESZH</option>
          <option value='unavailable'>SOULD OUT</option>
        </select>
        <textarea ref={(input) => this.desc = input} placeholder='description'></textarea>
        <input ref={(input) => this.image = input} type='text' placeholder='Fish Image'/>
        <button type='submit'>+ ADD ITEMZ</button>
      </form>
    );
  }
}

export default AddFishForm;
