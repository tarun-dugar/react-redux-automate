module.exports = `import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import actions here

class {{containerName}} extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // reducer mapping here
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // actions mapping here
  }
}

export default connect(mapStateToProps, mapDispatchToProps)({{containerName}});
`;