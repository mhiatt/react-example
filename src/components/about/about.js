import React from 'react';
import Paper from 'material-ui/lib/paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

export default class About extends React.Component {

  render() {
    return (
      <Paper style={style} zDepth={3} />
    );
  }

};
