// Redux dev tools without trace and without console.logging actions when testing:
import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)
  const store = createStore(rootReducer, preloadedState, composedEnhancers)
  return store
}

// Redux dev tools with trace:
// import { applyMiddleware, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import rootReducer from './reducers/rootReducer'

// export default function configureStore(preloadedState) {
//   const middlewares = [thunkMiddleware]
//   const composeEnhancers = composeWithDevTools({trace:true, traceLimit: 25})
//   const store = createStore(rootReducer, preloadedState, composeEnhancers(applyMiddleware(...middlewares)))
//   return store
// }

// Redux dev tools with console.logged'd actions when running `npm test`, no trace:
// import { applyMiddleware, createStore } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import loggerMiddleware from './middleware/logger'
// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import rootReducer from './reducers/rootReducer'

// export default function configureStore(preloadedState) {
//   const middlewares = [loggerMiddleware, thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)
//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
//   const composedEnhancers = composeWithDevTools(...enhancers)
//   const store = createStore(rootReducer, preloadedState, composedEnhancers)
//   return store
// }