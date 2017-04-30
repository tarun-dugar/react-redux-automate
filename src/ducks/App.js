import { fromJS } from 'immutable';

const initialState = fromJS({
  'isLoading': false
});

// action types
const LOADING = 'LOADING';

// reducer
export default function reducer(state=initialState, action={}) {
  switch (action.type) {
    case LOADING: return state.merge(fromJS({
      'isLoading': true
    }));
    default: return state;
  }
}


// action creators
export function loadData() {
  return {
    'type': LOADING
  };
}