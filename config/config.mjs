import path from "path" ;
import url from "url"
import { normalizePort } from "./appsupport.mjs";
let __dirname=url.fileURLToPath(import.meta.url);
__dirname=path.dirname(__dirname);
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'newproject'
    },
    port: normalizePort(process.env.PORT || 3000),
    db: 'mongodb+srv://ahmed:kkk@cluster0.x29vn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  },

  test: {
    root: rootPath,
    app: {
      name: 'newproject'
    },
    port: normalizePort(process.env.PORT || 3000),
    db: 'mongodb+srv://ahmed:kkk@cluster0.x29vn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  },

  production: {
    root: rootPath,
    app: {
      name: 'newproject'
    },
    port:normalizePort( process.env.PORT || 3000),
    db: 'mongodb+srv://ahmed:kkk@cluster0.x29vn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

  }
};

export default config[env];
