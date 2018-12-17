import {
  CREATE_SET,
  MOVE_TO_TRASH,
} from '../actions/sets';

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
    case MOVE_TO_TRASH: {
      const id = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            isDeleted: true,
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default sets;
