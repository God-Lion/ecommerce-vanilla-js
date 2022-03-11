export class User {
  static length = 0
  static currentUser = 0
  static isUser = true

  constructor ( id, name, email, username, password ) {
    this.id = id
    this.name = name
    this.email = email
    this.username = username
    this.password = password
  }

  set Id ( id ) { this.id = id }
  get Id() { return this.id }

  set Name ( name ) { this.name = name }
  get Name() { return this.name }

  set Email ( email ) { this.email = email }
  get Email() { return this.email }
}

export class Article {
  static length = 0

  constructor ( id, name, mark, image, category, height, price, year, star ) {
    this.id = id
    this.name = name
    this.mark = mark
    this.image = image
    this.category = category
    this.height = height
    this.price = price
    this.year = year
    this.star = star
  }

  toString () {
    return `id : ${this.id}`
  }
}

export class LigneCart {

  constructor ( id, qte, price, idUser ) {
    this.id = id
    this.qte = parseInt(qte)
    this.price = parseFloat(price)
    this.idUser = idUser
  }

  addQte ( qte ) { 
    this.qte = parseInt(this.qte)
    this.qte  += parseInt(qte)
  }

  getId () { return this.id }

  get Price () { return this.price * this.qte }
}

export class Sale {
  static length = 0

  constructor ( id, idUser, idShoe, number, date ) {
    this.id = id
    this.idUser = idUser
    this.idShoe = idShoe
    this.number = number
    this.date = date
  }
}

export class Storage {
  STORAGE_KEY = 'Lion-Sneakers'

  constructor () { this.fetch() }
  
  fetch () { 
    let data = JSON.parse(localStorage.getItem( this.STORAGE_KEY) || '[]')
    if (  data.toString().length > 1 ) Storage.findData = true
    else this.save([[],[],[],[]])
    return data
  }
    
  fetchAllUser () {
    const users = this.fetch()[0]
    if ( users.length === 0) return []
    users.forEach( (user, i) => { user.id = i })
    User.length = users.length
    return users
  }
  
  fetchAllArticle () {
    const articles = this.fetch()[1]
    if ( articles.length === 0) return []
    // articles.forEach( ( article, i) => { article.id = i })
    Article.length = articles.length
    return articles
  }

  fetchAllCart () {
    const carts = this.fetch()[2]
    if ( carts.length === 0) return []
    // carts.forEach( (cart, i) => { cart.id = i })

    // Cart.length = carts.length
    return carts
  }

  fetchAllSale () {
    const sales = this.fetch()[3]
    if ( sales.length === 0) return []
    sales.forEach( ( sale, i) => { sale.id = i })
    Sale.length = sales.length
    return sales
  }
  
  save ( data ) { localStorage.setItem( this.STORAGE_KEY, JSON.stringify( data ))}
}