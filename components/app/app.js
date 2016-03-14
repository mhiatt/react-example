import React from "react";
import { Link } from "react-router";
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

import * as StudentActions from '../../actions/StudentActions';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentWillMount() {
    StudentActions.loadStudents();
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleRequest(openState) {
    this.setState({ open: openState });
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div>
        <AppBar
          showMenuIconButton={false}
          title="Student Manager App"
        />
        <div>
          { this.props.children }
        </div>

      </div>

    );
  }
}
