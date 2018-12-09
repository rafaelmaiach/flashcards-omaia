import { createStore } from 'redux';
import rootReducer from '../reducers';

export default createStore(rootReducer);

/*
  STORE LAYOUT

  {
    sets: {
      allIds: [id],
      byId: {
        id: {
          id,
          title,
          backgroundColor,
          cards: [cardId],
        }
      }
    },
    cards: {
      allIds: [id],
      byId: {
        id: {
          id,
          frontText,
          backText,
          backgroundColor,
          foregroundColor,
        }
      }
    },
  }

*/
