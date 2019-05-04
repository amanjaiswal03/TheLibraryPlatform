import {gql} from 'apollo-boost';

const getAuthorsQuery = gql`
    query {
        author{
            name
            id
        }
    }
`
const getBooksQuery = gql`
    query {
        books{
            id
            name
            genre
            authorName
        }
    }
`

const getLibrariesQuery = gql`
    query {
        libraries{
            name
            id
            address
            membershipFee
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
            userId
            books{
                name
                id
                authorName
            }
            User{
                email
            }
        }
    }

`
const getLibraryByUserQuery = gql`
    query GetLibraryByUser($id: ID){
        user(id: $id){
            library{
                id
                name
                address
                membershipFee
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
                address
                id
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
    mutation AddLibrary($name: String!, $address: String!, $membershipFee: String!, $userId: ID!){
        addLibrary(name: $name, address: $address, membershipFee: $membershipFee, userId: $userId){
            name
            id
            address
            membershipFee
            User{
                first_name
                last_name
                email
            }
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
    mutation RemoveBook($id: ID!, $librariesId: [ID]!){
        removeBook(id: $id, librariesId: $librariesId ){
            id
            librariesId
        }
    }
`




export {  addAuthorMutation, removeBookMutation, getAuthorsQuery,  getLibrariesQuery,getBooksQuery, getLibraryQuery, getBookQuery,getAuthorNQuery,getLibraryByUserQuery, addLibraryMutation, addBookMutation} ;