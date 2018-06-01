import React from "react";
import { render } from "react-dom";
import TestForm from "./TestForm";
import t from "tcomb-form";

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      bears: [],
      currentBear: {
        name: "",
        age: 0,
        species: "",
        color: "",
        isHibernating: false,
        isFriendly: false
      }
    }

    this.btnClick = this.btnClick.bind(this);
    this.updateBear = this.updateBear.bind(this);
  }

  updateBear(event) {
    let bear = this.state.currentBear;
    // if (event.target.dataset.type === "name") {
    //   bear.name = event.target.value;
    // } else if (event.target.dataset.type === "age") {
    //   bear.age = event.target.value;
    // }
    bear[event.target.dataset.type] = event.target.value;

    this.setState({
      currentBear: bear
    })
    console.log(this.state.currentBear);
  }

  btnClick() {
    fetch('http://localhost:3000/api/bears')
      .then(res => res.json())
      .then(data => this.setState({bears:data}))
  }

  render () {
  let BearComponents = this.state.bears.map((bear) =>
    <ul>
      <li>Name: {bear.name}</li>
      <li>Species: {bear.species}</li>
      <li>Color: {bear.color}</li>
      <li>Age: {bear.age}</li>
      <li>{bear.isHibernating ? "Hibernating" : "Not Hibernating"}</li>
      <li> {bear.isFriendly ? "Friendly" : "Not Friendly"}</li>
    </ul>
  )

    return (
      <div>
        <TestForm />
        {BearComponents}
        <button
          onClick={this.btnClick}
          className="btn btn-danger"
          id="clickMe" type="button"
          name="findBears">Show All of the BEARS!
        </button>

      </div>
    )
  }
}

render(<Index/>, document.getElementById("root"));
