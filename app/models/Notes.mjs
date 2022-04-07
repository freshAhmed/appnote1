const _note_key=Symbol('key');
const _note_title=Symbol('title');
const _note_body=Symbol('body')
import { schemaNote } from "./sechema.mjs";
import   iniConnection  from "./initConnection.mjs";


export class AbstractNotesStore{
    constructor(iniConnection,schemaNote){
       
        this.modelnote=undefined;
    }
    async closeNote(){}
    async readNote(queres,done){
        this.findnot(queres,done)
    }
    async destroyNote(key){
        const modelnote= iniConnection.connection.models.note==undefined?  await iniConnection.createModel({nameModel:'note',schema:schemaNote}):iniConnection.connection.models.note;
         if(typeof key==='string' && key.length>0 ) {
            let res=await modelnote.deleteOne({key:key});
          if(res.deletedCount>0){
              return true
          }else{
              return false;
          }
         }
    }
    async createNote(key,title,body){

       const modelnote=await iniConnection.createModel({nameModel:'note',schema:schemaNote});
     
       this.modelnote=modelnote;
       const note=await modelnote({key:key,title:title,body:body})
   
       note.save()
       return note
    }
    async updateNote(oldnotekey,newData,done){   
        const modelnote= iniConnection.connection.models.note==undefined?  await iniConnection.createModel({nameModel:'note',schema:schemaNote}):iniConnection.connection.models.note;
 
        if(newData.key==undefined){
            if(typeof oldnotekey.key=='string'&& oldnotekey.key.length>0){
                let result=await modelnote.updateOne(oldnotekey,newData,{upsert:false});
          if(result.matchedCount>0){
           this.findnot({key:oldnotekey.key},done)
          }

            }
        }else if(newData.key!==undefined){
        
            done(`you can't update the key of the document`,null)
        }else{
            done(`sorry coudn't update document with new data`,null)

        }

    }
    async findnot(queres,done){ 
        let querey={key:typeof queres.key === "string" && queres.key.length > 0 ? queres.key :undefined,
                   title:typeof queres.title === "string" && queres.title.length > 0 ? queres.title :undefined}
                      
        if((querey.key==undefined&&querey.title==undefined )){
            done(('plese define one of two property'),null)
        }else{

            const modelnote= iniConnection.connection.models.note==undefined?  await iniConnection.createModel({nameModel:'note',schema:schemaNote}):iniConnection.connection.models.note;


              const Query=   modelnote.findOne().bykey(querey)
              if(typeof Query!=="string"){
                Query.exec(done)

              }else{
                  let message=Query;
                  done(message,null)
              }
        }
         
    }
    async lengthNotes(){

    }
    async getnotes(queres,done){
        const modelnote= iniConnection.connection.models.note==undefined?  await iniConnection.createModel({nameModel:'note',schema:schemaNote}):iniConnection.connection.models.note;

        let querey={key:typeof queres.key === "string" && queres.key.length > 0 ? queres.key :undefined,
                  title:typeof queres.title === "string" && queres.title.length > 0 ? queres.title :undefined}
        if(querey.key!==undefined||querey.title!==undefined){
      const Query=modelnote.find().bykey(querey)
      if(typeof Query!=='string'){
          Query.exec(done)
      }
        }else{
            const Query=modelnote.find().bykey({key:'',title:''})
            if(typeof Query!=='string'){
                Query.exec(done)
            }  
        }
    }
}
