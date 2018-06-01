import React from "react";
import { render } from "react-dom";
import TestForm from "./TestForm";
import t from "tcomb-form";

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      bears: []
    }

    this.getBears = this.getBears.bind(this);
    this.showBears = this.showBears.bind(this);
  }

  getBears() {
    fetch('http://localhost:3000/api/bears')
      .then(res => res.json())
      .then(data => this.setState({bears:data}))
  }

  showBears() {
    if(document.getElementById("showBears").style.display === "block") {
      document.getElementById("showBears").style.display = "none";
    } else {
    document.getElementById("showBears").style.display = "block";
    }
  }

  render () {
  let BearComponents = this.state.bears.map((bear, index) =>
    <ul key={index}>
      <li>Name: {bear.name}</li>
      <li>Species: {bear.species}</li>
      <li>Color: {bear.color}</li>
      <li>Age: {bear.age}</li>
      <li>{bear.isHibernating ? "Hibernating" : "Not Hibernating"}</li>
      <li>{bear.isFriendly ? "Friendly" : "Not Friendly"}</li>
    </ul>
  )

    return (
      <div>
      <div>
        <TestForm />
      </div>
        <div id = "showBears" style={{ display: "none" }}>
          {BearComponents}
        </div>
        <div>
          <button
            onClick={this.getBears}
            className="btn btn-danger"
            id="clickMe" type="button"
            name="findBears">Get All of the BEARS!
          </button>
          <button
            onClick={this.showBears}
            className="btn btn-danger"
            id="showBears" type="button"
            name="findBears">Show All of the BEARS!
          </button>
        </div>
      </div>
    )
  }
}

render(<Index/>, document.getElementById("root"));
