import mongoose from 'mongoose';
import config   from './config'

console.log("initialize mongoose");
console.log("mongoUrl", config.mongoUrl);

const db = mongoose.connection;
const Schema = mongoose.Schema;

const options = {
  socketTimeoutMS: 0,
  keepAlive: true,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  useNewUrlParser: true,
};

function init() {
  return mongoose.connect(config.mongoUrl, options)
            .then( () => {
              console.log("============== end of initialize ==================", config.mongoUrl);
            })
            .catch(e => console.error("connection ERROR", e));
}


export {
  init,
  db,
  Schema,
};
