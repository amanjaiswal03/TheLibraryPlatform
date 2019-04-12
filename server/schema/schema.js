const graphql = require('graphql');
const Library = require('../models/library');
const Book = require('../models/book');
const Author = require('../models/author');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLFloat, GraphQLNonNull } = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        authorId: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        librariesid: { type: new GraphQLList(GraphQLID) },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById(parent.authorId);
            }
        },
        library: {
            type: new GraphQLList(LibraryType),
            resolve(parent, args) {
                return Library.find({ booksid: parent.id });
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorId: parent.id });
            }
        }
    })
})

const LibraryType = new GraphQLObjectType({
    name: 'Library',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        booksid: { type: new GraphQLList(GraphQLID) },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ _id: { $in: parent.booksid } });
            }
        },
        membershipFee: { type: GraphQLFloat },
        houseRules: { type: GraphQLString },
        additionalFeatures: { type: GraphQLString },
        reviews: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        library: {
            type: LibraryType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Library.findById(args.id);
            }
        },
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Book.findById(args.id);
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                return Author.findById(args.id);
            }
        },
        libraries: {
            type: new GraphQLList(LibraryType),
            resolve(parents, args) {
                return Library.find({});
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parents, args) {
                return Author.find({});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parents, args) {
                return Book.find({});
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        addLibrary: {
            type: LibraryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                booksid: { type: new GraphQLList(GraphQLID) },
                membershipFee: { type: new GraphQLNonNull(GraphQLString) },
                houseRules: { type: GraphQLString },
                additionalFeaturs: { type: GraphQLString },
                reviews: { type: GraphQLString }
            },
            resolve(parent, args) {
                let library = new Library({
                    name: args.name,
                    address: args.address,
                    booksid: args.booksid,
                    membershipFee: args.membershipFee,
                    houseRules: args.houseRules,
                    additionalFeaturs: args.additionalFeatures,
                    reviews: args.reviews
                });
                return library.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: GraphQLString },
                authorId: { type: new GraphQLNonNull(GraphQLString) },
                librariesid: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId,
                    librariesid: args.librariesid
                });
                return book.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name
                });
                return author.save();
            }
        }
    })
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})