import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { Normalize } from 'styled-normalize';

import { client } from './graphql';
import { Routing } from './Routing/Routing';
import { store } from './store';
import { GlobalStyles } from './styles/GlobalStyles';

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Normalize />
        <GlobalStyles />

        <Routing />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
