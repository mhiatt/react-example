import React from 'react';
import { Link } from 'react-router';

import * as StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';

export default class Create extends React.Component {
  constructor() {
    super();
    this.newStudent = {
      name: {
        first: '',
        last: '',
      },
      age: '',
    };
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  createStudent() {
    StudentActions.createStudent(this.newStudent, () => {
      this.props.history.pushState('/');
    });

  }

  setValues(event) {
    switch (event.target.id) {
      case 'firstName': {
        this.newStudent.name.first = event.target.value;

        break;
      }
      case 'lastName': {
        this.newStudent.name.last = event.target.value;

        break;
      }
      case 'age': {
        this.newStudent.age = event.target.value;

        break;
      }
    }
  }

  render() {
    const textFieldStyle = {
      margin: 12,
    };

    const containerStyle = {
      width: '100%',
      padding: 20,
    };

    return (
      <div style={containerStyle}>
        <Link to="/">
          <FlatButton label="home" icon={<ArrowBack />} />
        </Link>
        <br />
        <TextField
          id="firstName"
          floatingLabelText="First Name"
          onChange={this.setValues.bind(this)}
          style={textFieldStyle}
        />
        <TextField
          id="lastName"
          floatingLabelText="Last Name"
          onChange={this.setValues.bind(this)}
          style={textFieldStyle}
        />
        <TextField
          id="age"
          floatingLabelText="Age"
          onChange={this.setValues.bind(this)}
          style={textFieldStyle}
          type="number"
        />
        <br />
        <RaisedButton label="save" onClick={this.createStudent.bind(this)} />
      </div>
    );
  }

}
