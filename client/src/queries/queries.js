import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
    {
        author{
            name
            id
        }
    }
`
const getBooksQuery = gql`
    {
        books{
            id
            name
            genre
            authorName
        }
    }
`

const getLibrariesQuery = gql`
    {
        libraries{
            name
            id
            address
        }
    }
`
const getLibraryQuery = gql`
    query GetLibrary($id: ID){
        library(id: $id){
            id
            name
            address
            membershipFee
            books{
                name
                id
                authorName
            }
        }
    }

`

const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id){
            id
            name
            genre
            authorName
            library{
                name
            }
            author{
                name
            }
        }
    }

`
const getAuthorNQuery = gql`
    query GetAuthorN($name: String!){
        authorN(name: $name){
            id
            name   
        }
    }
`


const addLibraryMutation = gql`
    mutation AddLibrary($name: String!, $address: String!, $membershipFee: String!){
        addLibrary(name: $name, address: $address, membershipFee: $membershipFee){
            name
            id
            address
            membershipFee
        }
    }
`

const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorName: String!, $librariesId: [ID]){
        addBook(name: $name, genre: $genre, authorName: $authorName, librariesId: $librariesId){
            name
            genre
            id
            authorName
            librariesId
        }
    }
`
const addAuthorMutation = gql`
    mutation AddAuthor($name: String!){
        addAuthor(name: $name){
            name
        }
    }
`

const removeBookMutation = gql `
    mutation RemoveBook($id: ID!){
        removeBook(id: $id){
            id
        }
    }
`



export {  addAuthorMutation, removeBookMutation, getAuthorsQuery,  getLibrariesQuery,getBooksQuery, getLibraryQuery, getBookQuery,getAuthorNQuery, addLibraryMutation, addBookMutation} ;