import { isset, ucfirst, in_array, array_diff, get_class_methods, call_user_func_array } from './functions.js'
import { Controller } from './Controller.js'
import { Request } from './Request.js'
import { Router } from './Router.js'

export class Dispatcher {
    request
    
    constructor () {
      
        this.request = new Request()
        Router.parse( this.request.url, this.request)
        let name
        if( isset(this.request.controller) ) name = ucfirst( this.request.controller ) + 'Controller'
        import(`./../controller/${name}.js`).then(( module ) => {
            let controller = new module[name](this.request)
            let action = this.request.action
            if (this.request.prefix) action = `${this.request.prefix}_${action}`
			if ( !in_array(action, array_diff(get_class_methods(controller), get_class_methods(new Controller()))) ) 
				this.error( `Le controller ${this.request.controller} n'a pa de methode ${action}` )
            call_user_func_array(new Array(controller, action), this.request.params );
			controller.render( action )
        }).catch( err => { 
            this.error(`Le controller ${this.request.controller} n'existe pas`)
        })
    }

    error ( message ) {
        let controller = new Controller( this.request )
        controller.e404( message )
    }
}