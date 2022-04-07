import { handlehomepage } from './home.mjs';
import {handleAddnoteRequest,handlesearchfornoteRequest,handle_notes,get_notesList,handle_notes_updates,removeNote} from './addnote.mjs'
// console.log(ha)
export default {handlehomepage:handlehomepage,
              handleAddnoteRequest:handleAddnoteRequest,
              handle_searchfornote_Request:handlesearchfornoteRequest,
              handle_notes:handle_notes,
              get_notesList:get_notesList,
              handle_notes_updates:handle_notes_updates,removeNote:removeNote}