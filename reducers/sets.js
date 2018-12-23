import {
  CREATE_SET,
  MOVE_TO_TRASH,
  RESTORE_SET,
  DELETE_TRASH_SETS,
} from '../actions/sets';

const initialState = {
  byId: {},
};

const sets = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SET: {
      const set = action.payload;
      const cardsIds = Object.keys(set.cards);

      return {
        ...state,
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
      const setsById = { ...state.byId };

      Object.keys(setsById).forEach((id) => {
        if (idsToDelete.includes(id)) {
          delete setsById[id];
        }
      });

      return {
        ...state,
        byId: { ...setsById },
      };
    }
    default: {
      return state;
    }
  }
};

export default sets;
