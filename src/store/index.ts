import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';

// const sagaMiddleware = createSagaMiddleware();

// const store = configureStore({
//   reducer: {},
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { rootSaga } from './sagas'; // Your root saga
import formDataReducer from './reducer'; // Import your formDataReducer

const rootReducer = combineReducers({
  formData: formDataReducer, // Add formDataReducer to combineReducers
  // Add other reducers here if needed
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
//   composeWithDevTools(applyMiddleware(sagaMiddleware))
// );

sagaMiddleware.run(rootSaga);

export default store;
