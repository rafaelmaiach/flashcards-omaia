import {
  SET_BG_COLOR,
} from '../actions/statusBar';

const statusBar = (state = {}, action) => {
  switch (action.type) {
    case SET_BG_COLOR: {
      return {
        ...state,
        backgroundColor: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default statusBar;
