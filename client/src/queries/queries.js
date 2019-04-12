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
        author{
            name
            id
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
                author{
                    name
                    id
                }
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
            library{
                name
            }
            author{
                id
                name
            }
        }
    }

`
const getAuthorQuery = gql`
    query GetAuthor($id: ID){
        author(id: $id){
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
    mutation AddBook($name: String!, $genre: String!, $authorId: String!, $librariesId: [ID]){
        addBook(name: $name, genre: $genre, authorId: $authorId, librariesid: $librariesId){
            name
            genre
            id
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

export {getAuthorsQuery, addAuthorMutation,  getLibrariesQuery,getBooksQuery, getLibraryQuery, getBookQuery,getAuthorQuery, addLibraryMutation, addBookMutation} ;