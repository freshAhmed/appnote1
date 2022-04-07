
import { AbstractNotesStore } from "../models/Notes.mjs";
const AbstractNotesStor=new AbstractNotesStore()

export async function handleAddnoteRequest(req,res){

    const {key ,title, body}=req.body;


  if(typeof key=='string' && key.length>0 && typeof title==='string' &&  title.length>0 && title!==key){
   let note=await AbstractNotesStor.createNote(key,title,body)
 

      res.json(note)

  }else{ 
 
      if(typeof key!=='string'){
        res.json(500,{error :'key should be string'})
      }else if(key.length<0){
        res.json(400,{error :'please use some character in your title'})

      }
      if(typeof title!=="string"){
        res.json(400,{error :'title should be string'})

      }else if(title.length<0){
        res.json(400,{error :'please use some character in your title'})

      }
      if(key===title){
        res.json(400,{error :'the key and title should not be the same'})

      }
  }
    
}
export async function handlesearchfornoteRequest(req,res){
console.log(req.body)
    await AbstractNotesStor.findnot(req.body,async(message,note)=>{

        if(message==null&&note!==null){
         res.json(note)
 
        }else if(note==null){
           if(req.body.key!==undefined){
             res.status(400).json({error:`sorry could find the note that related to ${typeof req.body.key=='string'?'key : '+req.body.key:typeof req.body.key}`})

           }else if(req.body.title!==undefined){
          
            res.status(400).json({error:`sorry could find the note that related to ${typeof req.body.title==='string'?'title : '+req.body.title:typeof req.body.title}`})
         
           }else{
            res.status(400).json({error:`please define one of the two (key or title) or both`})

           }
 
            
 
        }
    })

  


}
export async function handle_notes(req,res){
    const params=req.params;
    await AbstractNotesStor.findnot(params,(err,note)=>{
        if(err==null&&note!==null){
            res.json(note)
        }else if(note==null){
               res.status(404).json({error:`sorry couldn't find the note that related to http://127.0.0.1:3000/${req.path} `})
        }
    })

}

export async function get_notesList(req,res){
await AbstractNotesStor.getnotes(req.body,(err,list)=>{
    if(err==null&&list!==null){
        res.json(list)
    }else {
        res.status(401,{error:`couldn't find list of notes`})
    }
})
}
export async function handle_notes_updates(req,res){
   const params=req.params;

   await AbstractNotesStor.updateNote(params,req.body,(error,newNote)=>{
      
       if(error==null && newNote!==undefined){
           res.json(newNote)
       }else{
          
           res.status(401).json({error:error})
       }
   }) 
}
export async function removeNote(req,res){
const params=req.params;
   let result= await AbstractNotesStor.destroyNote(params.key);
   if(result){
    res.send(`the document that related to key: ${params.key} is removed`)
   }else{
    res.send(`sorry there no document related to key:${params.key} !!`)
}
}