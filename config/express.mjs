import express from 'express';
import logger from "morgan"
import cookieParser from 'cookie-parser';
import body_parser from "body-parser"

import compress from "compression"
import { handle404,basicErrorHandler } from './appsupport.mjs';
import  router from '../app/router.mjs'
import exphbs from 'express-handlebars'
export const AppHandler= (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';
  
 const hbs=exphbs.create({defaultLayout:"main",extname:'hbs',layoutsDir:"/Users/ahmed/twitter/app/views/layouts",partialsDir:"views/partials"})

   app.engine('hbs',hbs.engine);
   app.set('views',config.root + '/app/views')
   app.set('view engine',"hbs")
  app.use(logger('dev'));
  app.use(body_parser.urlencoded({
    extended: true
  }));
  app.use(body_parser.json());

  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  
  app.use(router)
  app.use(handle404)


  if (app.get('env') === 'development') {
  app.use(basicErrorHandler)

   
  }

  app.use(basicErrorHandler)


  return app;
};
