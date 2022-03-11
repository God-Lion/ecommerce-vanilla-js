const year = document.querySelector('#date')
year.innerHTML = new Date().getFullYear()
const PATH_IMG = '../assets/img/'

function time () {
  let hours = document.querySelector('#hours')
  let minutes = document.querySelector('#minutes')
  let secondes = document.querySelector('#secondes')
  hours.innerHTML = new Date().getHours()
  minutes.innerHTML = new Date().getMinutes()
  secondes.innerHTML = new Date().getSeconds()
}
setInterval(time, 1000)



class User {
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
}

class Shoe {
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
}

class LigneCart {

  constructor ( id, qte, price, idUser ) {
    this.id = id
    this.qte = qte
    this.price = price
    this.idUser = idUser
  }

  addQte ( qte ) { this.qte += qte }

  getId () { return this.id }

  getPrice () { return this.price * this.qte }
}
class Cart {
  static length = 0

  static getPrice () {
    let total = 0;
    let carts = storage.fetchAllCart()
    let  list = new Array()
    carts.forEach ( cart => { list.push( new LigneCart( cart.id, cart.qte, cart.price, cart.idUser ) ) })
    for( let i = 0 ; i < list.length ; i++ ) total += list[i].getPrice()
    return total
  }

  add ( code, qte, price ) {
    let users = storage.fetchAllUser()
    let shoes = storage.fetchAllShoe()
    let carts = storage.fetchAllCart()
    let sales = storage.fetchAllSale()
    let ligneCart = new LigneCart ( code, qte, price, 1 )
    carts.push( ligneCart )
    let all = new Array()
    all.push( users )
    all.push( shoes )
    all.push( carts )
    all.push( sales )
    storage.save( all )
  }

  removeArticle ( id ) {
    let users = storage.fetchAllUser()
    let shoes = storage.fetchAllShoe()
    let carts = storage.fetchAllCart()
    let sales = storage.fetchAllSale()
    carts.forEach( cart => { if ( cart.id === id ) carts.splice( carts.indexOf( cart ), 1) })
    let all = new Array()
    all.push( users )
    all.push( shoes )
    all.push( carts )
    all.push( sales )
    storage.save( all )
  }
}

class Sale {
  static length = 0

  constructor ( id, idUser, idShoe, number, date ) {
    this.id = id
    this.idUser = idUser
    this.idShoe = idShoe
    this.number = number
    this.date = date
  }
}

class Storage {
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
  
  fetchAllShoe () {
    const shoes = this.fetch()[1]
    if ( shoes.length === 0) return []
    shoes.forEach( (shoe, i) => { shoe.id = i })
    Shoe.length = shoes.length
    return shoes
  }

  fetchAllCart () {
    const carts = this.fetch()[2]
    if ( carts.length === 0) return []
    carts.forEach( (cart, i) => { cart.id = i })
    Cart.length = carts.length
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

const storage = new Storage ()
let user1 = new User ( 1, 'Zico Bornelus', 'borneluszico@gmail.com', 'admin', 'admin' ) 
let user2 = new User ( 2, 'Bico lola', 'lola@gmail.com', 'lux', 'lus' ) 
let allUser = new Array()
allUser.push( user1 )
allUser.push( user2 )

let shoe1 = new Shoe ( 1, 'air force one', 'NIKE', PATH_IMG + 'adidas/1.png' , 'Nike', 42, 120.80, 2020, 5 )
let shoe2 = new Shoe ( 2, 'air', 'NIKE', PATH_IMG + 'adidas/2.png' , 'Adidas', 40, 100.80, 2010, 3 )
let shoe3 = new Shoe ( 3, 'Jordan', 'NIKE', PATH_IMG + 'adidas/3.png' , 'Nike', 44, 150.80, 2018, 4 )
let shoe4 = new Shoe ( 4, 'Jordan', 'NIKE', PATH_IMG + 'adidas/4.png' , 'Nike', 44, 150.80, 2018, 4 )
let shoe5 = new Shoe ( 5, 'Das', 'adidas', PATH_IMG + 'adidas/5.png' , 'Adidas', 44, 150.80, 2018, 4 )
let shoe6 = new Shoe ( 6, 'Das', 'adidas', PATH_IMG + 'adidas/6.png' , 'Puma', 44, 150.80, 2018, 4 )
let allShoe = new Array()

// for (let i = 1; i < 30; i++) {
//   let nom = 'adidas'
//   let shoe = new Shoe ( 
//     1, 'air force one', nom, PATH_IMG + nom +'/'+ i +'.png' , nom, 42, 120.80, 2020, 5 )
//   allShoe.push( shoe )
// }

// for (let i = 1; i < 24; i++) {
//   let nom = 'nike'
//   let shoe = new Shoe ( 
//     1, 'air force one', nom, PATH_IMG + nom + '/'+ i +'.png' , nom, 42, 120.80, 2020, 5 )
//   allShoe.push( shoe )
// }

// for (let i = 1; i < 11; i++) {
//   let nom = 'puma'
//   let shoe = new Shoe ( 
//     1, 'air force one', nom, PATH_IMG + nom + '/'+ i +'.png' , nom, 42, 120.80, 2020, 5 )
//   allShoe.push( shoe )
// }
allShoe.push( shoe1 )
allShoe.push( shoe2 )
allShoe.push( shoe3 )
allShoe.push( shoe4 )
allShoe.push( shoe5 )
allShoe.push( shoe6 )
// let cart1 = new Cart( 1, 4, 455, 1 )
let allCart = new Array()
// allCart.push(cart1)
let allSale = new Array()
let all = new Array()
all.push(allUser)
all.push(allShoe)
all.push(allCart)
all.push(allSale)
storage.save(all)
let shoes = storage.fetchAllShoe()
// let carts = storage.fetchAllCart()
// function add () {

// buy( 1, 2, 100 )
// buy( 2, 2, 300 )


// remove( 1 )

  






function resetDOMArticle() {
  const contentArticle = document.querySelector('#contentArticle')
  contentArticle.innerHTML = ''
}
function builDOMArticle( shoe ) {
  const contentArticle = document.querySelector('#contentArticle')
  const caseArt = document.createElement('div')
  caseArt.classList.add('col-3')
  caseArt.classList.add('case-art')
  const divImg = document.createElement('div')
  const image = new Image ()
  image.src = shoe.image
  divImg.appendChild( image )
  const divTitle = document.createElement('div')
  divTitle.classList.add('title')
  const divMarkName = document.createElement('div')
  const PMarkName = document.createElement('p')
  PMarkName.innerHTML = shoe.name
  divMarkName.appendChild( PMarkName )
  divTitle.appendChild( divMarkName )
  const divStar = document.createElement('div')
  const PStar = document.createElement('p')
  for ( let i = 0 ; i < shoe.star ; i++ ) {
    const star = document.createElement('i')
    star.classList.add('fas')
    star.classList.add('fa-star')
    PStar.appendChild( star )
  }
  divStar.appendChild( PStar )
  divTitle.appendChild( divStar )
  const divPrice = document.createElement('div')
  const PPrice = document.createElement('p')
  PPrice.innerHTML = shoe.price
  divPrice.appendChild( PPrice )
  divTitle.appendChild( divPrice )
  caseArt.appendChild( divImg )
  caseArt.appendChild( divTitle )
  contentArticle.appendChild( caseArt )
}
for ( let i = 0; i < shoes.length; i++ ) builDOMArticle( shoes[i] )

let a = new Array()
for ( let i = 0 ; i < shoes.length ; i++ ) a.push(shoes[i].category)

function onlyUnique ( value, i, self ) {
  return self.indexOf( value ) === i
}
let category = a.filter(onlyUnique)
function builDOMCategory( category ) {
  const contentCategory = document.querySelector('#allCategory')
  for ( let i = 0 ; i < category.length ; i++ ) {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('category')
    button.innerHTML = category[i]
    contentCategory.appendChild( button )
  }
}
builDOMCategory( category )

function search( shoes, search ) {
  resetDOMArticle()
  for ( let i = 0 ; i < shoes.length ; i++ )
    if ( shoes[i].name.search( search ) === 0 || 
         shoes[i].name.toLowerCase().search( search ) === 0 || 
         shoes[i].mark.search( search ) === 0 || 
         shoes[i].mark.toLowerCase().search( search ) === 0 || 
         shoes[i].category.search( search ) === 0 || 
         shoes[i].category.toLowerCase().search( search ) === 0
        )
      builDOMArticle( shoes[i] )
}

function searchCategorie( shoes, search = null ) {
  resetDOMArticle()
  if ( search === null ) 
    for ( let i = 0 ; i < shoes.length ; i++ )
      builDOMArticle( shoes[i] )
  for ( let i = 0 ; i < shoes.length ; i++ )
    if ( shoes[i].category.search( search ) === 0 || shoes[i].category.toLowerCase().search( search ) === 0 )
      builDOMArticle( shoes[i] )
}

const searchInput = document.querySelector('#search')
searchInput.addEventListener('keyup', function (e) { search( shoes, searchInput.value) })

document.querySelectorAll('#allCategory button').forEach( category => {
  category.addEventListener('click', function (e) {
    if ( category.innerHTML == 'All') {
      searchCategorie( shoes )
    } else searchCategorie( shoes, category.innerHTML)
  })
})


