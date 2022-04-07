
import mongoose from 'mongoose';
import { AbstractNotesStore } from '../models/Notes.mjs';

export async function handlehomepage(req, res, next)  {
 
await     res.render('partials/index.hbs', {

  title: 'Generator-Express MVC',
  // articles: articles
});
}
