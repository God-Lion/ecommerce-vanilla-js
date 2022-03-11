import { is_array, trim } from './functions.js'
import { hook } from './../config/hook.js'
import { Session } from './Session.js'
import { Form } from './Form.js'

export class Controller {
    vars = new Map()
    rendered 	= false
    layout 		= 'default'
    request

    constructor ( request = null ) {
        this.Session = new Session ()
        this.Form = new Form ( this )
        if ( request ) {
            this.request = request
            hook( this )
        }
    }

    render ( view ) {
        if(this.rendered) return false
        if ( trim( this.request.url, '#' ) == '/' ) this.layout = 'home'
        import(`./../view/layout/${this.layout}.js`).then((module) => {
            module.loadLayaout(this)
            if ( view.indexOf('/') === 0 ) view = `./../view${view}.js`
            else view = `./../view/${this.request.controller}/${view}.js`
            import(view).then(( mod ) => { mod.loadview(this.vars) }).catch( () => {})
        })
        this.rendered = true
    }

    set ( key, value = null ) {
        if ( is_array( key ) ) this.vars += key
        else this.vars.set(`${key}`, value)
    }

    loadModel ( name ) {
        console.log(
            name
        );
    //     if ( !isset( this.name ) ) {
    //         this.name = loadModel( name )
    //         if ( isset( this.Form ) )
    //             this.name.Form = this.Form
    //     }
    }

    e404( message ) {
    //     header('HTTP/1.0 404 Not Found');
        this.set('message', message)
        this.render('/errors/404')
    //     die();
    }

    request ( controller, action ) {
    //     controller += 'Controller'
    //     require_once ROOT.DS.'controller'.DS.$controller.'.php';
    //     $c = new $controller();
    //     return $c -> $action();
    }

    redirect ( url, code = null ) {
    //     if ( code == 301 ) header('HTTP/1.1 301 Moved Permanently');
    //     header("Location: ".Router::url($url));
    }
}
// 37787458