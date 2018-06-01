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

    this.btnClick = this.btnClick.bind(this);
  }

  btnClick() {
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
