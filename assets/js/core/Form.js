import { isset, empty } from './functions.js'
export class Form {
    controller
    errors

    constructor ( controller ) { this.controller = controller } 

    input( name, label, options = {} ) {
        console.log( options)
        let errors = false
        let classError = ''; 
        let value
        if ( isset(this.errors) ) {
            if (isset(this.errors[name])) {
                errors 	= this.errors[name]
                classError = 'alert-warning'
            }
        }
        // this.controller.request.data = 'lala'
    //    console.log( !isset(this.controller.request.data.name) )
    //    console.log( !isset(this.controller.request.data.name) )

    //     if (!isset($this -> controller -> request -> data -> $name)) $value = '';
    //     else value = $this -> controller -> request -> data -> $name;
        if ( label == 'hidden') return `<input type="hidden" name="${name}" value="${value}">`
        let html = `<div class="form-group ${classError}">`
        let attr = ' ';
        for (const k in options) if ( k != 'type') attr += `${k}="${options[k]}" `;
        if(!isset(options['type'])) {
            html += `
    <div class="form-group">
        <label for="input${name}">${label}</label>
        <input type="text" name="${name}" value="${value}" aria-describedby="TitreHelp">
    </div>`
        }
        else if ( options['type'] == 'textarea' ) {
            html += `
    <div class="form-group">
        <label for="input${name}">${label}</label>
        <textarea name="${name}" aria-describedby="TitreHelp"${attr}>${value}</textarea>
    </div>`
        }
        else if ( options['type'] == 'checkbox' ){
            html += `
    <div class="form-group form-check">
        <input type="hidden" name="${name}" value="0">
        <input type="checkbox" ${attr} name="${name}" value="1" ${(empty(value)? '' : 'checked')}>
        <label class="form-check-label" for="check${name}">${label}</label>
    </div>`
        }
        else if ( options['type'] == 'username' ) {
            html += `
    <label for="user" class="sr-only">Username address</label>
    <input type="text" name="${name}" value="${value}"${attr}aria-describedby="TitreHelp" placeholder="${label}" required autofocus>`
        }
        else if ( options['type'] == 'password' ) {
            html += `
    <label for="input${name}" class="sr-only">Password</label>
    <input type="password" name="${name}" value="${value}"${attr}aria-describedby="TitreHelp" placeholder="${label}" required>`
        }
        else if ( options['type'] == 'file' ){
        html += `
    <div class="custom-file">
        <input type="file"${attr}name="${name}" value="${value}" aria-describedby="input${name}">
    </div>`
        }
        if (errors) html += `<span class="help-inline">${errors}</span>`
        html += `
</div>`
        return html
    }
}