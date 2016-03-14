import React from 'react';
import { Link } from 'react-router';

import * as StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';

export default class Student extends React.Component {
  constructor() {
    super();
    this.getStudent = this.getStudent.bind(this);
    this.updateInfo = {};

    this.state = {
      student: {
        name: {
          first: '',
          last: '',
        },
        age: '',
      },
      edit: false,
      open: false,
    };
  }

  componentWillMount() {
    StudentStore.on("change", this.getStudent);
  }

  componentDidMount() {
    this.setState({
      student: StudentStore.getOne(this.props.params.id),
    });
  }

  componentWillUnmount() {
    StudentStore.removeListener("change", this.getStudent);
  }

  deleteStudent() {
    StudentActions.deleteStudent(this.props.params.id);
    this.props.history.pushState('/');
  }

  toggleModal() {
    this.setState({
      open: this.state.open ? false : true,
    });
  }

  toggleEdit() {
    this.setState({
        edit: true,
    });
  }

  updateStudent() {
    StudentActions.updateStudent(this.props.params.id, this.updateInfo, () => {
      this.setState({
        edit: false,
      })
    });
  }

  getStudent() {
    this.setState({
      student: StudentStore.getOne(this.props.params.id),
    });
  }

  goBack() {
    this.setState({
      edit: false,
    });
  }

  setValues(event) {
    switch (event.target.id) {
      case 'firstName': {
        this.updateInfo.name.first = event.target.value;

        break;
      }
      case 'lastName': {
        this.updateInfo.name.last = event.target.value;

        break;
      }
      case 'age': {
        this.updateInfo.age = event.target.value;

        break;
      }
    }
  }

  render() {

    const { student, edit } = this.state;

    const textFieldStyle = {
      margin: 12,
    };

    const btnStyle = {
      margin: 12,
    };

    const containerStyle = {
      margin: 20,
      width: '100%',
    };

    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        onTouchTap={this.toggleModal.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.deleteStudent.bind(this)}
      />,
    ];

    this.updateInfo = student;

    if (edit) {
      return (
        <div style={containerStyle}>
          <FlatButton label="back" icon={<ArrowBack />} onClick={this.goBack.bind(this)} />
          <br />
          <TextField
            id="firstName"
            hintText={student.name.first}
            floatingLabelText="First Name"
            onChange={this.setValues.bind(this)}
            style={textFieldStyle}
          />
          <TextField
            id="lastName"
            hintText={student.name.last}
            floatingLabelText="Last Name"
            onChange={this.setValues.bind(this)}
            style={textFieldStyle}
          />
          <TextField
            id="age"
            hintText={student.age}
            floatingLabelText="Age"
            onChange={this.setValues.bind(this)}
            style={textFieldStyle}
            type="number"
          />
          <br />
          <RaisedButton label="save" onClick={this.updateStudent.bind(this)} />
        </div>
      );
    }

    return (
      <div  style={containerStyle}>
        <Link to="/">
          <FlatButton label="home" icon={<ArrowBack />} />
        </Link>
        <br />
        <RaisedButton label="Edit" onClick={this.toggleEdit.bind(this)} style={btnStyle} />
        <RaisedButton label="Delete" onClick={this.toggleModal.bind(this)} primary={true} style={btnStyle} />
        <h1>{ student.name.first } { student.name.last }</h1>
        <p>{ student.age }</p>
        <Dialog
          title="Warning!"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Are you sure you want to delete { student.name.first } { student.name.last }?
        </Dialog>
      </div>
    );
  }

}
