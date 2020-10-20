const mongoose = require("mongoose");
require("dotenv/config");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Conectado");
  })
  .catch((error) => {
    console.log("MHouve um erro ao se conectar com o MongoDb" + error);
  });

module.exports = mongoose;
