import {
  CREATE_SET,
} from '../actions/newSet';

const initialState = {
  allIds: [],
  byId: {},
};

const sets = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_SETS': {
      return {
        ...state.sets.byId,
      };
    }
    case CREATE_SET: {
      return {
        ...state,
        allIds: state.allIds.concat(action.payload.id),
        byId: {
          ...state.byId,
          [action.payload.id]: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default sets;
