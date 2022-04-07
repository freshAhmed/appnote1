

import express from 'express'
import  config  from './config/config.mjs';
import https from "https"
import mongoose from './node_modules/mongoose/index.js';
import  {AppHandler} from './config/express.mjs'
import { onError,onListening } from './config/appsupport.mjs';
// console.log(AppHandler)
mongoose.connect(config.db);
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const app = express();
export const server=https.createServer(app);
AppHandler(app,config)

server.on('error',onError)
server.on('listening',()=>{
  onListening(server)
})
server.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

