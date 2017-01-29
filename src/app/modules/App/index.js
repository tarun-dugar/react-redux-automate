import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadData } from './ducks/App';

import SideBar from './components/SideBar';

class App extends React.Component {
  render() {
    return (
      <main className="app">
        <SideBar />
        <div className="app__section">
          {this.props.children}
        </div>
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
