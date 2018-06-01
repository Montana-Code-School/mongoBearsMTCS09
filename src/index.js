import React from "react";
import { render } from "react-dom";
import TestForm from "./TestForm";
import t from "tcomb-form";

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      isHidden: false,
      bears: []
    }

    this.showBears = this.showBears.bind(this);

  }

  showBears() {
    this.setState({
      isHidden:!this.state.isHidden
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/bears')
      .then(res => res.json())
      .then(data => this.setState({bears:data}))
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
    let showBearsStyle = this.state.isHidden ? { display: "block" } :{ display: "none" };
    let bearText = this.state.isHidden ? "Hide All of the BEARS!" : "Show All of the BEARS!";
    return (
      <div>
      <div>
        <TestForm />
      </div>
        <div id = "showBears" style={showBearsStyle}>
          {BearComponents}
        </div>
        <div>
          <button
            onClick={this.showBears}
            className="btn btn-danger"
            id="showBears" type="button"
            name="findBears">{bearText}
          </button>
        </div>
      </div>
    )
  }
}

render(<Index/>, document.getElementById("root"));
