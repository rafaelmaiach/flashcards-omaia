import {
  SET_SELECTED_SET,
} from '../actions/selectedSet';

const initialState = {};

const selectedSet = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_SET: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default selectedSet;
