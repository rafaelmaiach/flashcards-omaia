import {
  CREATE_CARDS,
} from '../actions/cards';

const cards = (state = {}, action) => {
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

export default cards;
