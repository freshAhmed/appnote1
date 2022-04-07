import mongoose from "mongoose";

class iniConnection {
    constructor(url,opt={collection:'string'}){
         this.url=url;
         this.mongoose=mongoose
         this.collection=opt.collection;
       this.connect= function(){
        try{
      
          return this.mongoose.createConnection(this.url,{autoIndex:false})
            
       }catch(err){
           throw Error(err)
       }
       }
       try{
        this.connection=  this.connect()

       this.mongoose.connection .on('error',(err)=>{
            throw new Error(err)
        })
       }catch(er){
           throw new Error(er)
       }

    }
    
  createModel(infoModel){
        const {nameModel,schema}=infoModel;
    if(typeof nameModel==='string'&& nameModel.length>0  ){
        if(this.connection.readyState==1){
            return ( this.connection.model(nameModel,schema))
        }
    
    }
    

    }


}
// console.log(new iniConnection('mongodb+srv://ahmed:kkk@cluster0.x29vn.mongodb.net/note?retryWrites=true&w=majority',{collection:'stored'}).createModel)

export default new iniConnection('mongodb+srv://ahmed:kkk@cluster0.x29vn.mongodb.net/note?retryWrites=true&w=majority',{collection:'stored'})  
