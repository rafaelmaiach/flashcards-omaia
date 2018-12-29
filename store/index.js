import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['newSet', 'statusBar', 'selectedSet'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };

/*
  STORE LAYOUT

  {
    newSet: {
      title,
      backgroundColor,
    },
    sets: {
      byId: {
        id: {
          id,
          title,
          backgroundColor,
          isDeleted,
          cards: [cardId],
        }
      }
    },
    cards: {
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
