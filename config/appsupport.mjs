import  * as config from './config.mjs';

export function normalizePort(val){
  const port = parseInt(val,10);
  if(isNaN(port)){
    return val
  }
  if(port>=0){
    return port
  }
  return false
}
export function handle404(req, res, next)  {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
export function basicErrorHandler(error,req,res,next){
if(res.headersSent){
return next('err')
}
res.locals.message=error.mesaage;
res.locals.error =res.app.get('env')=="development"?error:{}

res.status(error.status||500)
res.render("error", {
    message: error.message,
    error: {},
    title: 'error'
  })
}
export function onError(error){
    const port=config.port;
    if(error.syscall!=='listen') throw error;
    const bind=typeof port=="string"?'Pipe '+port :'port'+port;
    switch(error.code){
        case"EACCES":
        console.error(`${bind} requires elevated privilage`);
        process.exit(1);
        break;
        case "EADDRINUSE":
            console.error(`${bind} is aleady in use`)
            process.exit(1);
            break;
            default:throw error
    }
}
export function onListening(server){
    const add=server.address()
    
    const bind=typeof add.port=='string'?' Pipe '+add.port:' port '+add.port;
    console.log(`server listening on ${bind}`)
}