import {
  CREATE_SET,
  MOVE_TO_TRASH,
  RESTORE_SET,
  DELETE_TRASH_SETS,
  ADD_NEW_CARD_TO_SET,
} from '../actions/sets';

const initialState = {
  allIds: [],
  byId: {},
};

const sets = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SET: {
      const set = action.payload;

      const newAllIds = [...new Set(state.allIds.concat(set.id))];

      return {
        ...state,
        allIds: newAllIds,
        byId: {
          ...state.byId,
          [set.id]: {
            ...set,
            cards: set.cards,
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

      const newAllIds = state.allIds.filter(id => !idsToDelete.includes(id));

      return {
        ...state,
        allIds: newAllIds,
        byId: { ...setsById },
      };
    }
    case ADD_NEW_CARD_TO_SET: {
      const { setId, cardId } = action.payload;

      return {
        ...state,
        byId: {
          ...state.byId,
          [setId]: {
            ...state.byId[setId],
            cards: state.byId[setId].cards.concat(cardId),
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
