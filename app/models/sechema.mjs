import mongoose from "mongoose";
export const schemaNote= mongoose.Schema({key:{type:String,},
                                           title:{type:String},
                                            body:{type:String}},{collection:'stored'})


schemaNote.query.bykey=function (querey){
let key=typeof querey.key=='string'?querey.key:undefined;
let title=typeof querey.title=='string'?querey.title:undefined;
if(key!==undefined){
    return this.where({key:new RegExp(key,'i')})
}else if(title!==undefined){
return this.where({title:new RegExp(title,'i')})

}

return 'please specify one one querey of the two (key or title) or both'
}