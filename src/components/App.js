import React from "react";
import Order from "./Order";
import Inventory from "./Inventory";
import Header from "./Header";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";
import { timingSafeEqual } from "crypto";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    const { params } = this.props.match;
    //First reinstate our localStorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    //1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //2. Add our new fish to that variable
    fishes[`fish${Date.now()}`];
    //3. Set the new fishes object to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    //1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2. Update that state
    fishes[key] = updatedFish;
    //3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    //1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2. Update that state, we need to set it to null to be removed from Firebase
    fishes[key] = null;
    //3. Set that to state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    //1. Take a copy of state
    const order = { ...this.state.order };
    //2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    //3. Call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    //1. Take a copy of state
    const order = { ...this.state.order };
    //2. As we are not mirroring on Firebase, we can use delete keyword
    delete order[key];
    //3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
