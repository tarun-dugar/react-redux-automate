module.exports = `import { combineReducers } from 'redux';
import AppReducer from '../ducks/App';

const rootReducer = combineReducers({
  AppReducer
});
export default rootReducer;
`;