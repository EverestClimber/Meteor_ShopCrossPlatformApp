import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import client from '../ApolloClient';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  reducers,
  {}, // initial state
  composeWithDevTools(
    applyMiddleware(thunk, client.middleware()),
  ),
);

export { store };

