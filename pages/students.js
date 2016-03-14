import React from 'react';

import Student from '../components/student/StudentTableRow';
import * as StudentActions from '../actions/StudentActions';
import StudentStore from '../stores/StudentStore';

import Table from 'material-ui/lib/table/table';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableBody from 'material-ui/lib/table/table-body'

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

export default class Students extends React.Component {
  constructor() {
    super();
    this.getStudents = this.getStudents.bind(this);

    this.state = {
      students: StudentStore.getAll(),
    };
  }

  componentWillMount() {
    StudentStore.on("change", this.getStudents);
  }

  componentWillUnmount() {
    StudentStore.removeListener("change", this.getStudents);
  }

  getStudents() {
    this.setState({
      students: StudentStore.getAll(),
    });
  }

  deleteStudent(id) {
    StudentActions.deleteStudent(id);
  }

  createLink() {
    this.props.history.push('/create');
  }

  render() {
    const { students } = this.state;
    let StudentComponents;

    if (Object.keys(students).length === 0) {
      StudentComponents = (
        <TableRow>
          <TableRowColumn columnNumber={3} style={{textAlign: "center"}}>
            There are no students!
          </TableRowColumn>
        </TableRow>
      );
    } else {
      StudentComponents = Object.keys(students).map((student) => {
        return <Student key={student} {...students[student]} more={student} />;
      });
    }


    const containerStyle = {
      padding: 20,
    };

    return (
      <div style={containerStyle}>
        <h1>Students</h1>
        <FloatingActionButton mini={true} onMouseUp={this.createLink.bind(this)}>
          <ContentAdd />
        </FloatingActionButton>
        <Table selectable={false} striped={true}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Age</TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {StudentComponents}
          </TableBody>
        </Table>
      </div>
    );
  }

}
