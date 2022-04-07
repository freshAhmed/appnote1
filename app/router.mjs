import express from 'express';
 const router = express.Router();
import handlers from './controllers/index.mjs';

router.get('/',handlers.handlehomepage)
router.post('/addnote',handlers.handleAddnoteRequest)
router.get('/notes/lookfornotes',handlers.handle_searchfornote_Request)
router.get('/notes/:key',handlers.handle_notes);
router.put('/notes/update/:key',handlers.handle_notes_updates)
router.put('/notes/removeNote/:key',handlers.removeNote)
router.get('/notes',handlers.get_notesList)
export default router