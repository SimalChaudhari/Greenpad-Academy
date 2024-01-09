import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
  let persistor = persistStore(store);
  // return { store, persistor };
// };

export {persistor};
export default store;