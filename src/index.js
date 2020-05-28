const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routesV1 = require("./routes/v1");

dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// parse application/x-www-form-urlenconded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routesV1(app);

mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Running on ${PORT}`);
    });
  })
  .catch(error => {
    console.log("MongoDB error ", error);
  });


