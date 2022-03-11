import { empty } from './functions.js'
export class Request {
    url
    page = 1
    prefix = false
    data = false

    constructor () {
        // window.addEventListener('hashchange', () => {
        //     console.log('lolo');
            this.url = ( empty( window.location.hash ) ) ? '/' : window.location.hash 
        // } )
        // this.url = ( empty( window.location.hash ) ) ? '/' : window.location.hash 
        // if (isset($_GET['page'])) 
        //     if (is_numeric($_GET['page'])) 
        //         if ($_GET['page'] > 0 ) $this -> page = round($_GET['page']);

        // if (!empty($_POST)) {
        //     $this -> data = new stdClass();
        //     foreach ($_POST as $k => $v) {
        //         $this -> data -> $k = $v;
        //     }
        // }
    }

    // let hashChange = function(e) {
//         let hash = window.location.hash
//         let a = document.querySelector('a[href="'+ hash +'"]')
//         if (a !== null && !a.classList.contains('active'))
//         printTab(a, e !== undefined)
// }
// window.addEventListener('hashchange', hashChange)
// hashChange()
}