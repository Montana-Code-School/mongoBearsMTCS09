import React from "react";
import t from "tcomb-form";

const Form = t.form.Form;

const BearFormSchema = t.struct({
  name: t.String,
  age: t.Number,
  color: t.String,
  species: t.String,
  isHibernating: t.Boolean,
  isFriendly: t.Boolean
});


export default class TestForm extends React.Component {
  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit (evt) {
    evt.preventDefault()
    const value = this.refs.form.getValue()
    if (value) {
      // do a post
      fetch(
        'http://localhost:3000/api/bears',
        {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({value})
        })
        .then( ( res ) => {return res.json()})
        .then( data => console.log(data));
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Form ref="form" type={BearFormSchema} />
        <div className="form-group">
          <button type="submit" className="btn btn-danger">Save</button>
        </div>
      </form>
    )
  }
};
