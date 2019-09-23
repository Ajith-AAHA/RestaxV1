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

const departmentSchema = require('./graphql/index').departmentSchema;

app.use('/graphql', cors(), graphqlHTTP({
  schema: departmentSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
