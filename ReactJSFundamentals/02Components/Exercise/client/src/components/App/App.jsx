import React, { Component } from 'react';
import './App.css';
import data from './../../constants/common';

import Street from './../Street/Street';
import House from './../House/House';
import HouseDetails from './../HouseDetails/HouseDetails';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streets: [],
      selectedStreetIndx: 0,
      selectedHouseIndx: 0,
      hasFetched: false
    };

    this.getSelectedStreet = this.getSelectedStreet.bind(this);
    this.getSelectedHouse = this.getSelectedHouse.bind(this);
    this.onHoverStreet = this.onHoverStreet.bind(this);
    this.onHoverHouse = this.onHoverHouse.bind(this);
  }

  componentDidMount() {
    fetch(`${data.baseUrl}/feed/street/all`)
      .then(data => data.json())
      .then(data => {
        console.log(data.message);
        console.log(data);
        this.setState({ streets: data.streets, hasFetched: true });
      }).catch(console.log);
  }

  onHoverStreet(index) {
    debugger;
    this.setState({ selectedStreetIndx: index });
  }

  getSelectedStreet() {
    return this.state.streets[this.state.selectedStreetIndx].homes;
  }

  onHoverHouse(index) {
    this.setState({ selectedHouseIndx: index });
  }

  getSelectedHouse() {
    return this.state.streets[this.state.selectedStreetIndx].homes[this.state.selectedHouseIndx];
  }

  render() {
    if (!this.state.hasFetched) {
      return null;
    }

    return (
      <div className="App">
        <div className="streets">
          <h2>Streets</h2>
          { this.state.streets.map((street, index) => {
            return <Street key={index} id={index} {...street} onHoverE={this.onHoverStreet} />
          }) }
        </div>
        <div className="houses">
          <h2>Houses</h2>
          { this.getSelectedStreet().map((home, index) => {
            return <House imageUrl={home.imageUrl} id={index} key={index} onHoverE={this.onHoverHouse} />
          }) }
        </div>
        <div>
          { this.state.selectedHouseIndx ?
          <HouseDetails {...this.getSelectedHouse()} /> :
          null }
        </div>
      </div>
    );
  }
}

export default App;
