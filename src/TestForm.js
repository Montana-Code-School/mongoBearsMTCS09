import React from "react";
import t from "tcomb-form";


const Form = t.form.Form;

//
// const FormSchema = t.struct({
//   name: t.String,         // a required string
//   age: t.maybe(t.Number), // an optional number
//   rememberMe: t.Boolean   // a boolean
// })

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
      console.log(value);
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
