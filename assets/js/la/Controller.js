import { Article, LigneCart, Storage } from './Model.js'
const storage = new Storage ()

function onlyUnique ( value, i, self ) { return self.indexOf( value ) === i }

export class ControllerArticle {
    articles = storage.fetchAllArticle()
    categories = new Array()

    constructor () {
        for ( let i = 0 ; i < this.articles.length ; i++ ) 
            this.categories.push( this.articles[i].category ) 
    }

    search ( search ) {
        let products = new Array()
        for ( let i = 0 ; i < this.articles.length ; i++ )
            if ( `${this.articles[i].id}`.search( search ) === 0 || 
                `${this.articles[i].id}`.toLowerCase().search( search ) === 0 ||
                this.articles[i].name.search( search ) === 0 || 
                this.articles[i].name.toLowerCase().search( search ) === 0 || 
                this.articles[i].mark.search( search ) === 0 || 
                this.articles[i].mark.toLowerCase().search( search ) === 0 || 
                this.articles[i].category.search( search ) === 0 || 
                this.articles[i].category.toLowerCase().search( search ) === 0
            ) products.push(this.articles[i])
            // console.log(products)
            // console.log(this.articles[i])
            return products

    }

    searchCategory ( search = null ) {
        let categoryArticle = new Array()
        if ( search === null ) return this.articles
        for ( let i = 0 ; i < this.articles.length ; i++ ) if ( this.articles[i].category.search( search ) === 0 || this.articles[i].category.toLowerCase().search( search ) === 0 ) categoryArticle.push ( this.articles[i] )
        return categoryArticle
    }

    list () { return this.articles }

    category ()  { return this.categories.filter( onlyUnique ) }

}

export class Cart {
    static length = 0
    users = storage.fetchAllUser()
    articles = storage.fetchAllArticle()
    carts = storage.fetchAllCart()
    sales = storage.fetchAllSale()

    idArticle ( id ) {
        for ( let i = 0; i < this.carts.length; i++ ) if( id == this.carts[i].id ) return i
        return -1
    }

    add ( id, qte, price ) {
        let ligneCart
        let i = this.idArticle( id )
        if( i == -1 ) {
            ligneCart = new LigneCart ( id, qte, price, 1 )
            this.carts.push( ligneCart )
        }
        else {
            ligneCart = new LigneCart ( this.carts[i].id, this.carts[i].qte, this.carts[i].price, 1 )
            ligneCart.addQte( qte )
            this.carts[i] = ligneCart
        }
        let all = new Array()
        all.push( this.users )
        all.push( this.articles )
        all.push( this.carts )
        all.push( this.sales )
        storage.save( all )
    }

    removeArticle ( id ) {
        // carts.forEach( cart => { if ( cart.id === id ) carts.splice( carts.indexOf( cart ), 1) })
        let i = this.idArticle( id )
        if (i > -1) this.carts.splice(i, 1);
        console.log( this.carts );
        // let all = new Array()
        // all.push( users )
        // all.push( shoes )
        // all.push( carts )
        // all.push( sales )
        // storage.save( all )
    }

    print () {
        let print =  new Map()
        let products =  new Array()
        this.carts.forEach ( cart => {
            let a = new LigneCart( cart.id, cart.qte, cart.price, cart.idUser )
            products.push([
                [new ControllerArticle().search(cart.id)],
                [
                    cart,
                    new LigneCart( cart.id, cart.qte, cart.price, cart.idUser ).Price
                ]
            ])
        })
        print.set('products', products)
        print.set('total', this.Price)
        return print

    }

    get Price () {
        let total = 0;
        let  list = new Array()
        this.carts.forEach ( cart => { list.push( new LigneCart( cart.id, cart.qte, cart.price, cart.idUser ) ) })
        for( let i = 0 ; i < list.length ; i++ ) total += list[i].Price
        return total
    }
}