import { Router } from './../core/Router.js'
// export class Conf {
//     static $debug = 1

//     static $databases = array(
//          'default' => array(
//             'host' => 'localhost',
//             'database' => 'tuto',
//             'login' => 'root',
//             'password' => ''
//          )
//     );
// }
Router.reload()
Router.prefix('cockpit', 'admin')
// Router.prefix('lola', 'momo')
Router.connect('/', 'pages/index')
// Router.connect('/', 'posts/index')
// Router.connect('post/:slug-:idpost', 'posts/view/idpost:([0-9]+)/slug:([a-z0-9\-]+)')
Router.connect('post/:slug-:idpost', 'posts/view/idpost:([0-9]+)/slug:([a-z0-9-]+)')
Router.connect('blog/:action', 'posts/:action')
