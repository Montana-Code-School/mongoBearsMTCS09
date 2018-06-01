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
    this.deleteBears = this.deleteBears.bind(this);
    this.updateBears = this.updateBears.bind(this);
  }

  showBears() {
    this.setState({
      isHidden:!this.state.isHidden
    })
  }

  deleteBears (evt) {
    evt.preventDefault()
    let deleteUrl='http://localhost:3000/api/bears/' + evt.target.dataset.id;
      fetch( deleteUrl, { method: 'DELETE' })
        .then( ( res ) => {return res.json()})
        .then( data => console.log(data));
    }

    updateBears (evt) {
      evt.preventDefault()
      let inputs = document.getElementsByTagName("input");
      let obj = {}

      //  grabbing all inputs and iterating through them
      for (var i = 0; i < inputs.length; i++) {
        //  if the name of the input includes is, it is a bool
        if(inputs[i].name.includes("is")){
          // set to true or false
          obj[inputs[i].name] =  inputs[i].value == "on" ? true : false;
        } else {
          // else will be string set to string
          obj[inputs[i].name] =  inputs[i].value;
        }
      }

        let updateUrl='http://localhost:3000/api/bears/' + evt.target.dataset.id;
        fetch( updateUrl, {
             method: 'PUT',
             body: JSON.stringify(obj),
             // need header to tell it to interpret JSON
             headers:{
              'Content-Type': 'application/json'
             }
           }
          )
          .then( ( res ) => {return res.json()})
          .then( data => console.log(data));
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
        <button
          onClick={this.deleteBears}
          className="btn btn-danger"
          id="deleteBears" type="button"
          name="deleteBears"
          data-id={bear._id} >Delete
        </button>
        <button
          onClick={this.updateBears}
          className="btn btn-danger"
          id="updateBears" type="button"
          name="updateBears"
          data-id={bear._id}>Meow
        </button>
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
