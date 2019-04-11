const express = require('express');
const bodyParser =require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
 const key= require('./keys');

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const projRoute = require('./Route/project.routes');

const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose
   .connect(key.mongoURI, { useNewUrlParser: true })
   .then(()=>console.log('MongoDB connection established successfully...'))
   .catch((err)=>console.log('Err',err));

// const connection= mongoose.connection;
//
// connection.once('open',()=>{
//     console.log('MongoDB connection established successfully...');
// });

app.use('/project',projRoute);

// app.get('/', (req,res) => {
//     res.sendFile("index.html", { root: path.join(__dirname) });
// });

app.listen(5000,()=>{
    console.log(`Server Running on PORT ${port}`);
});

module.exports = app;