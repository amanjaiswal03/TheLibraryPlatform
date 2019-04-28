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
import SearchResult from './components/SearchResult';
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'


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
            <Route exact path = '/' component = {Homepage} />
            <Route exact path = '/libraries' component = {LibraryList} />
            <Route exact path = '/addLibrary' component = {AddLibrary} />
            <Route exact path = '/register' component = {Register} />
            <Route exact path = '/login' component = {Login} />
            <Route exact path = '/profile' component = {Profile} />
            <Route exact path = '/library/:id' component = {LibraryDetails} />
            <Route exact path = '/book/:id' component = {BookDetails} />
            <Route exact path = '/search/:query' component = {SearchResult} />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
