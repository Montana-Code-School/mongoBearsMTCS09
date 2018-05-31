import React from "react";
import ReactDOM from "react-dom";

class Board extends React.Component {
  render () {
    return (
      <button className= "btn btn-danger board">Button</button>
    )
  }
}

ReactDOM.render(<Board/>, document.getElementById("root"));
