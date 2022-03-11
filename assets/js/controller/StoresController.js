import { Controller } from './../core/Controller.js'

export class StoresController extends Controller {
  index () {
    console.log('StoresController index view')
  }

  view () {
    console.log('StoresController view')
  }

  buy (id) {
    console.log('id' + id)
  }
}
