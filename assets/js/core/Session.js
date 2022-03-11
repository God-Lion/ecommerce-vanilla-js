import { isset, in_array, empty } from './functions.js'
export class Session {
    SESSION_KEY = 'Lion-Sneakers'
    session = new Array()

    constructor () { this.fetch() }

    setFlash ( message, type = 'success') {
        this.session.push({ flash: {
            'message': message,
            'type': type
        }})
        this.save(this.session)
    }

    flash () {
        let session = this.fetch()
        let html = ''
        session.forEach(e => { if (isset(e.flash))html = `<div class="alert alert-${e.flash.type}" role="alert"><p>${e.flash.message}</p></div>`});
        return html
    }

    write ( key, value ) { 
        this.session = this.fetch()
        let i
        this.session.forEach( (e, k) => {
            if (in_array(key, Object.getOwnPropertyNames( e ))) i = k
            else i = -i
        })
        if (i) this.session[i] = {[key] : value}
        else this.session.push({[key] : value })
        this.save(this.session)
    }

    read ( key = null ) {
        this.session = this.fetch()
        if ( key ) {
            let i
            this.session.forEach( (e, k) => {
                if (in_array(key, Object.getOwnPropertyNames( e ))) i = k
                else i = -i
            })
            return (i) ? this.session[i][key] : false
        } 
        else return this.session
    }

    user ( key ) {
        if ( this.read('user') ) {
            let find = (in_array(key, Object.getOwnPropertyNames( this.read('user') ))) ? true : false
            return ( find ) ? this.read('user')[key] : false
        }
        return false
    }

    isLogged() { return (this.user('role')) ? true : false }

    fetch () { 
        let data = JSON.parse(sessionStorage.getItem( this.SESSION_KEY) || '[]')
        if (  data.toString().length > 1 ) Session.findData = true
        else this.save([[],[]])
        return data
    }

    save ( data ) { sessionStorage.setItem( this.SESSION_KEY, JSON.stringify( data ))}
}