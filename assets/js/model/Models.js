import { Model } from './../core/Model.js'

export function loadModel (name) {
  if (name === 'Post') return new Post()
  return false
}

class Post extends Model {
}
