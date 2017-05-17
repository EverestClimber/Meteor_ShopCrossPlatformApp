import thunk from 'redux-thunk';
import reducers from '../reducers/index';
import client from '../ApolloClient';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// create a redux store by providing reducers and middleware
// currently using thunk middleware
// we also need to provide client.middleware() to let apollo/redux know about eachother.
const store = createStore(
  reducers,
  {}, // initial state is blank
  composeWithDevTools(
    applyMiddleware(thunk, client.middleware()),
  ),
);

export { store };

