import {
  CREATE_SET,
  MOVE_TO_TRASH,
  RESTORE_SET,
  DELETE_TRASH_SETS,
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
    case RESTORE_SET: {
      const id = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            isDeleted: false,
          },
        },
      };
    }
    case DELETE_TRASH_SETS: {
      const idsToDelete = action.payload;
      const allIds = [...state.allIds];
      const setsById = { ...state.byId };

      const newAllIds = allIds.filter(id => !idsToDelete.includes(id));

      Object.keys(setsById).forEach((id) => {
        if (idsToDelete.includes(id)) {
          delete setsById[id];
        }
      });

      return {
        ...state,
        allIds: newAllIds,
        byId: { ...setsById },
      };
    }
    default: {
      return state;
    }
  }
};

export default sets;
