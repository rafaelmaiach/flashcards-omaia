import {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  RESET_NEW_SET,
} from '../actions/newSet';

const initialState = {
  title: 'New Set',
  backgroundColor: '',
};

const sets = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_TITLE: {
      return {
        ...state,
        title: action.payload,
      };
    }
    case EDIT_BACKGROUND_COLOR: {
      return {
        ...state,
        backgroundColor: action.payload,
      };
    }
    case RESET_NEW_SET: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default sets;
