const express = require("express");
const mongoose = require('mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");


const app = express();


mongoose.connect('mongodb://localhost/Restax', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
  
  var root = {
    hello: () => {
      return 'Hello world!';
    },
  };
  

app.use('*', cors());

<<<<<<< HEAD
const fcourseSchema = require('./graphql/index').fcourseSchema;

app.use('/graphql', cors(), graphqlHTTP({
  schema: fcourseSchema,
=======
const courseSchema = require('./graphql/index').courseSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: courseSchema,
>>>>>>> 8b16ca73c587d29e516a0455ef21e3b7f5e30a37
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
