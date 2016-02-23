import React from "react";
import { Link } from "react-router";
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
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
          onLeftIconButtonTouchTap={this.handleToggle}
          title="React Example"
        />
        <LeftNav
          docked={false}
          onRequestChange={this.handleRequest}
          open={this.state.open}
          width={320}
        >
          <Link to="/about"><MenuItem onClick={this.handleClose} primaryText="About" /></Link>
          <Link to="/repos"><MenuItem onClick={this.handleClose} primaryText="Repos" /></Link>
        </LeftNav>
        <div>
          { this.props.children }
        </div>

      </div>

    );
  }
}
