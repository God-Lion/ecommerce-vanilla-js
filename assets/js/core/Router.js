import { isset, trim, empty, in_array, array_keys } from './functions.js'
import { Dispatcher } from './../core/Dispatcher.js'


export class Router {
    static routes = new Map()
    static prefixes = []

    static  prefix( url, prefix ) { Router.prefixes[url] = prefix }

    static parse( url, request ) {
        url = trim( url, '/' )
        url = trim( url, '#' )
        if ( empty( url ) ) url = Router.routes.get(1)['url']
        else {
            console.log( 'hello' )
            Router.routes.forEach( (v, k) => {
                // console.log( )
                // if (preg_match($v['catcher'], $url, $match)) {
                    request.controller = Router.routes.get(k)['controller']
                    // $request -> action = isset($match['action']) ? $match['action'] : $v['action'];
                    request.params = new Array()
                    // console.log( Router.routes.get(k)['params'] )
                    // Router.routes.get(k)['params'].forEach( (w, x) => {
                    //     request.params[x] = match[k]
                    // })
                    // foreach ($v['params'] as $k => $v)  $request -> params[$k] = $match[$k];
                    // if (!empty($match['args'])) $request -> params += explode('/', trim($match['args'], '/'));
                    // return $request;
                // }
            })
            // console.log( Router.routes)


        //     foreach (Router::$routes as $v) {
        //         if (preg_match($v['catcher'], $url, $match)) {
        //             $request -> controller = $v['controller'];
        //             $request -> action = isset($match['action']) ? $match['action'] : $v['action'];
        //             $request -> params = array();
        //             foreach ($v['params'] as $k => $v)  $request -> params[$k] = $match[$k];
        //             if (!empty($match['args'])) $request -> params += explode('/', trim($match['args'], '/'));
        //             return $request;
        //         }
        //     }
        }
        let params = url.split('/')
        if ( in_array(params[0], array_keys(this.prefixes))) {
            request.prefix = this.prefixes[params[0]]
            params.shift()
        }
        request.controller = params[0]
        request.action = isset(params[1]) ? params[1] : 'view';
        for ( const k in this.prefixes ) {
            if (this.prefixes.hasOwnProperty(k)) {
                const v = this.prefixes[k];
                if (`${v}_`.indexOf(request.action) === 0) {
                    request.prefix = v
                    request.action = request.action.replace(`${v}_`, '')
                }
            }
        }
        request.params = params.slice(2)
        return true
    }

    static connect( redir, url ) {
        let r = new Array()
        r['url'] = url
        r['params'] = new Map()
        r['redir'] = redir
        r['origin'] = url.replace(':action', '(?P<action>([a-z0-9]+))')
        console.log( `origin ${r['origin']}`)
        // r['origin'] = preg_replace('/([a-z0-9]+):([^\/]+)/', '${1}:(?P<${1}>${2})', $r['origin']);
        // console.log(
        //     r['origin'].replace( '/([a-z0-9]+):([^\/]+)/', '${1}:(?P<${1}>${2})' )
        // );



        // r['origin'] = preg_replace('/([a-z0-9]+):([^\/]+)/', '${1}:(?P<${1}>${2})', $r['origin']);
        // r['origin'] = '/^'.str_replace('/', '\/', $r['origin']).'(?P<args>\/?.*)$/';
        let params = url.split('/')
        params.forEach ( (v, k) => {
            if ( v.indexOf(':') ) {
                let p = v.split(':')
                r['params'].set( `${p[0]}`, p[1])
            }
            if ( k == 0 ) r['controller'] = v
            else if ( k == 1 ) r['action'] = v
        })
        r['catcher'] = redir
        r['catcher'] = r['catcher'].replace(':action', '(?P<action>([a-z0-9]+))')
        r['params'].forEach ( (v, k) => { r['catcher'] = r['catcher'].replace(":$k", "(?P<$k>$v)") })
       // $r['catcher'] = '/^'.str_replace('/', '\/', $r['catcher']).'(?P<args>\/?.*)$/';
       Router.routes.set( Router.routes.size + 1, r )
    }

    static reload () {
        window.addEventListener('hashchange', () => {
            // new Dispatcher()
            window.location.reload()
            console.log('Malolo');
        })
    }

    static beforeunload () {
        window.onbeforeunload = function () {
            let path = this.location.pathname
            let hash = this.location.hash
            console.log( this.location )
            return
        }
    }
}