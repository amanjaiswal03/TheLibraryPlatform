import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom'



//components
import LibraryList from './components/LibraryList';
import AddLibrary from './components/AddLibrary';
import NavbarLinks from './components/layout/navbar';
import Homepage from './components/Homepage';
import LibraryDetails from './components/LibraryDetails';
import BookDetails from './components/BookDetails';


//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client = {client}>
        <BrowserRouter>
          <NavbarLinks />
          <Switch>
            <Route exact path = '/' component = {Homepage} />
            <Route path = '/libraries' component = {LibraryList} />
            <Route path = '/addLibrary' component = {AddLibrary} />
            <Route path = '/library/:id' component = {LibraryDetails} />
            <Route path = '/book/:id' component = {BookDetails} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
