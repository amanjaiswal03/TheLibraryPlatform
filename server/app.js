const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json())

// allow cross origin requests
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

var Users = require('./routes/Users')

app.use('/users', Users)

mongoose.connect("mongodb+srv://test:test1234@libraryplatform-ebp2q.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to the database');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(process.env.PORT || 8888);

