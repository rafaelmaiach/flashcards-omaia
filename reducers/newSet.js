import uuidv4 from 'uuid/v4';
import {
  EDIT_TITLE,
  EDIT_BACKGROUND_COLOR,
  RESET_NEW_SET,
  ADD_CARD_NEW_SET,
  EDIT_CARD_COLOR,
  EDIT_CARD_BACK_TEXT,
  EDIT_CARD_FRONT_TEXT,
} from '../actions/newSet';
import { $white } from '../utils/colors';

const initialState = {
  id: uuidv4(),
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
    case EDIT_CARD_COLOR: {
      const { id, color, colorType } = action.payload;

      return {
        ...state,
        cards: {
          ...state.cards,
          [id]: {
            ...state.cards[id],
            [colorType]: color,
          },
        },
      };
    }
    case EDIT_CARD_BACK_TEXT: {
      const { id, text } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [id]: {
            ...state.cards[id],
            backText: text,
          },
        },
      };
    }
    case EDIT_CARD_FRONT_TEXT: {
      const { id, text } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [id]: {
            ...state.cards[id],
            frontText: text,
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
