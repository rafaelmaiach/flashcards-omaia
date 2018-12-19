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
    case CREATE_SET: {
      const set = action.payload;
      const cardsIds = Object.keys(set.cards);

      return {
        ...state,
        allIds: state.allIds.concat(set.id),
        byId: {
          ...state.byId,
          [set.id]: {
            ...set,
            cards: cardsIds,
          },
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
