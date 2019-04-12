import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//components
import LibraryList from './components/LibraryList';
import AddLibrary from './components/AddLibrary';

//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client = {client}>
        <div id = "main">
          <h1> Library Platform </h1>
          <LibraryList />
          <AddLibrary />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
