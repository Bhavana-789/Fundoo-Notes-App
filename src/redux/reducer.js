import {GET_LABELS} from './constant';

const inititalState = {labels: []};

const userReducer = (state = inititalState, action) => {
  switch (action.type) {
    case GET_LABELS: {
      return {...state, labels: action.payload};
    }
  }
  return state;
};
export default userReducer;
