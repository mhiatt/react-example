import React from 'react';
import { Link } from 'react-router';
import * as PeopleActions from '../../actions/StudentActions';

import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import RaisedButton from 'material-ui/lib/raised-button';

export default class Student extends React.Component {
  constructor(props) {
    super();
  }

  deleteStudentn(id) {
    StudentActions.deleteStudent(this.props.more);
  }

  render() {
    const { age, name, edit, more } = this.props;

    const viewString = '/update/' + more;

    const deleteStyle = {
      textAlign: 'right',
    };

    return (
      <TableRow>
        <TableRowColumn>
          {name.first} {name.last}
        </TableRowColumn>
        <TableRowColumn>
          {age}
        </TableRowColumn>
        <TableRowColumn>
          <Link to={viewString}>
            <RaisedButton label="View"  secondary={true} />
          </Link>
        </TableRowColumn>
      </TableRow>
    );
  }

}
