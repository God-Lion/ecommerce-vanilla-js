import { Controller } from './../core/Controller.js'

export class PostsController extends Controller {
  index () {
    console.log('PostsController index')
    // const perPage = 9
    // this.loadModel('Post')
    // let condition = array('online' => 1, 'type' => 'post');
    // let d['posts'] = $this -> Post -> find(array(
    // 'conditions' => $condition,
    // 'limit' => ($perPage * ($this -> request -> page - 1)).','.$perPage
    // ));
    // $d['total'] = $this -> Post -> findCount($condition);
    // $d['page'] = ceil($d['total']/$perPage);
    // this.set(d)
  }
}
