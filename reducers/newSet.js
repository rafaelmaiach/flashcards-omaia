import uuidv4 from 'uuid/v4';
import {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  RESET_NEW_SET,
  ADD_CARD_NEW_SET,
  REMOVE_CARD_NEW_SET,
  EDIT_CARD_COLOR,
  EDIT_CARD_TEXT,
  SET_EDITION,
} from '../actions/newSet';
import { $white } from '../utils/colors';

const initialState = {
  title: 'New Set',
  backgroundColor: '',
  cards: {},
};

const cardTemplate = {
  frontText: 'Write a question',
  backText: 'Write an answer',
  backgroundColor: '',
  foregroundColor: $white,
};

const newSet = (state = initialState, action) => {
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
    case ADD_CARD_NEW_SET: {
      const card = {
        ...cardTemplate,
        id: uuidv4(),
      };

      return {
        ...state,
        cards: {
          ...state.cards,
          [card.id]: card,
        },
      };
    }
    case REMOVE_CARD_NEW_SET: {
      const cardId = action.payload;

      const stateCopy = {
        ...state,
        cards: {
          ...state.cards,
        },
      };

      if (stateCopy.cards[cardId]) {
        delete stateCopy.cards[cardId];
      }

      return stateCopy;
    }
    case EDIT_CARD_COLOR: {
      const { id, color, colorType } = action.payload;

      const stateCopy = {
        ...state,
        cards: {
          ...state.cards,
        },
      };

      stateCopy.cards[id] = {
        ...stateCopy.cards[id],
        [colorType]: color,
      };

      return stateCopy;
    }
    case EDIT_CARD_TEXT: {
      const { id, text, type } = action.payload;

      const stateCopy = {
        ...state,
        cards: {
          ...state.cards,
        },
      };

      stateCopy.cards[id] = {
        ...stateCopy.cards[id],
        [type]: text,
      };

      return stateCopy;
    }
    case SET_EDITION: {
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

export default newSet;
