module.exports = `import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appActions } as actions from '../../ducks/App';

class App extends React.Component {
  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    'isLoading': state.AppReducer.get('isLoading')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    'actions': {
      'loadData': bindActionCreators(loadData, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
`;