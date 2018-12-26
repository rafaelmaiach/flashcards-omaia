import {
  CREATE_CARDS,
} from '../actions/cards';

const sets = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CARDS: {
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

export default sets;
