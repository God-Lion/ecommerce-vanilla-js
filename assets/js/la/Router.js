import { ControllerArticle, Cart } from './Controller.js'
export class RouterArticle {
  static init () {
    const products = Array.from(document.querySelectorAll('.case-art'))
    products.forEach(product => product.addEventListener('click', e => {
      // e.preventDefault()
      new RouterArticle(e.currentTarget.getAttribute('href'))
    }))
  }

  constructor (url) {
    this.element = this.buildDOM(url)
    // this.images  = images
    this.loadImage(url)
    // this.onKeyUp = this.onKeyUp.bind( this )
    const home = document.querySelector('#home')
    home.innerHTML = ''
    home.appendChild(this.element)
    // disableBodyScroll( this.element )
    // document.addEventListener('keyup', this.onKeyUp )
  }

  loadImage (url) {
    this.url = null
    const image = new Image()
    const container = this.element.querySelector('#contentPreviewArticle > div:first-child .art-img > div:first-child')
    const loader = document.createElement('div')
    loader.classList.add('img-loader')
    container.innerHTML = ''
    container.appendChild(loader)
    image.onload = () => {
      container.removeChild(loader)
      container.appendChild(image)
      // this.url = url
      this.url = this.article.image
    }
    // image.src = url
    // image.src = '../assets/img/adidas/1.png'
    image.src = this.article.image
  }

  search (url) {
    let x
    const p = url.split('/')
    p.forEach((a, i) => { if (a == 'id') x = i + 1 })
    return new ControllerArticle().search(p[x])
  }

  addToCart (e) {
    e.preventDefault()
    const cart = new Cart()
    const qte = this.element.querySelector('#qte.cart')
    console.log(this.article)

    cart.add(this.article.id, qte.value, this.article.price)
    qte.value = 1
    new RouterCart()
  }

  buildDOM (url) {
    this.article = this.search(url)[0]
    const dom = document.createElement('div')
    dom.classList.add('row')
    const contentPreviewArticle = document.createElement('div')
    contentPreviewArticle.id = 'contentPreviewArticle'
    contentPreviewArticle.classList.add('col-12')
    const containerDesArt = document.createElement('div')
    containerDesArt.classList.add('col-12')

    const artImg = document.createElement('div')
    artImg.classList.add('col-6')
    artImg.classList.add('p-0')
    artImg.classList.add('art-img')
    const divImg = document.createElement('div')
    artImg.appendChild(divImg)
    const artDes = document.createElement('div')
    artDes.classList.add('col-6')
    artDes.classList.add('p-0')
    artDes.classList.add('art-des')
    const divDesArt = document.createElement('div')
    divDesArt.classList.add('col-12')
    divDesArt.classList.add('p-0')

    const dvdB1 = document.createElement('div')
    dvdB1.classList.add('dvd-b')
    const divTitleArt = document.createElement('div')
    const pTitleArt = document.createElement('p')
    pTitleArt.classList.add('title')
    pTitleArt.innerHTML = this.article.name
    divTitleArt.appendChild(pTitleArt)
    dvdB1.appendChild(divTitleArt)
    const divStar = document.createElement('div')
    divStar.classList.add('statstar')
    const PStar = document.createElement('p')
    for (let i = 0; i < this.article.star; i++) {
      const star = document.createElement('i')
      star.classList.add('fas')
      star.classList.add('fa-star')
      PStar.appendChild(star)
    }
    divStar.appendChild(PStar)

    dvdB1.appendChild(divStar)
    const divPrice = document.createElement('div')
    divPrice.classList.add('price')
    const Pprice = document.createElement('p')
    Pprice.innerHTML = `$ ${this.article.price}`

    divPrice.appendChild(Pprice)
    dvdB1.appendChild(divPrice)

    divDesArt.appendChild(dvdB1)
    const dvdB2 = document.createElement('div')
    dvdB2.classList.add('dvd-b')
    const Pdes = document.createElement('p')
    Pdes.innerHTML = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit harum atque officia aliquid veritatis eveniet, minus eum nulla facere eos recusandae aliquam sunt quod id, rerum vitae odio ipsam quo!'
    dvdB2.appendChild(Pdes)
    divDesArt.appendChild(dvdB2)
    const dvdB3 = document.createElement('div')
    dvdB3.classList.add('dvd-b')
    const divInputCart = document.createElement('div')
    divInputCart.classList.add('input-field')
    divInputCart.classList.add('cart')
    const input = document.createElement('input')
    input.classList.add('cart')
    // input.type = 'number'
    input.type = 'text'
    input.value = 1
    input.id = 'qte'

    divInputCart.appendChild(input)
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('primary')
    button.classList.add('cart')
    button.innerHTML = 'Add to cart'
    divInputCart.appendChild(button)
    divDesArt.appendChild(divInputCart)
    divDesArt.appendChild(dvdB3)
    artDes.appendChild(divDesArt)

    containerDesArt.appendChild(artImg)
    containerDesArt.appendChild(artDes)
    contentPreviewArticle.appendChild(containerDesArt)
    dom.appendChild(contentPreviewArticle)
    dom.querySelector('.btn.cart').addEventListener('click', this.addToCart.bind(this))
    return dom
  }
}

export class RouterCart {
  constructor () {
    this.builDOMCart(new Cart().print())
  }

  builDOMCart (data) {
    const products = data.get('products')
    const total = data.get('total')

    const cartProduct = document.querySelector('#cartProduct')
    cartProduct.innerHTML = ''

    const tableResponsive = createDiv('table-responsive')
    const table = document.createElement('table')
    table.classList.add('table')
    table.classList.add('table-sm')
    const thead = document.createElement('thead')
    thead.innerHTML = '<tr><td>Product</td></tr>'
    const tbody = document.createElement('tbody')

    products.forEach(product => tbody.appendChild(this.tableRow(product)))

    const tfoot = document.createElement('tfoot')
    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.innerHTML = `Prix du panier total : <span class="price">$${total}<span>`
    tr.appendChild(td)
    tfoot.appendChild(tr)

    table.appendChild(thead)
    table.appendChild(tbody)
    table.appendChild(tfoot)

    tableResponsive.appendChild(table)

    cartProduct.appendChild(tableResponsive)
  }

  tableRow (product) {
    // console.log( product[0] );
    const qte = product[1][1]

    const prodCart = product[1][0]
    product = product[0][0][0]

    const tr = document.createElement('tr')
    const td = document.createElement('td')
    td.classList.add('product-des')
    const div1 = createDiv()
    const image = new Image()
    const loader = document.createElement('div')
    loader.classList.add('img-loader')
    div1.innerHTML = ''
    div1.appendChild(loader)
    image.onload = () => {
      div1.removeChild(loader)
      div1.appendChild(image)
      // this.url = url
      // this.url = this.article.image
    }
    // image.src = url
    // image.src = '../assets/img/adidas/1.png'
    image.src = product.image
    // image.src = this.article.image
    div1.appendChild(image)

    const div2 = createDiv()
    const PName = document.createElement('p')
    const Pprice = document.createElement('p')
    const Pqte = document.createElement('p')
    const Ptotal = document.createElement('p')
    Ptotal.classList.add('price')
    // PName.innerHTML = 'name'
    // Pprice.innerHTML = 'price'
    // Pqte.innerHTML = 'qte'
    // Ptotal.innerHTML = 'total'
    PName.innerHTML = product.name
    Pprice.innerHTML = `$${product.price}`
    Pqte.innerHTML = prodCart.qte
    Ptotal.innerHTML = `$${qte}`
    div2.appendChild(buildDomStar(product.star))
    div2.appendChild(PName)
    div2.appendChild(Pprice)
    div2.appendChild(Pqte)
    div2.appendChild(Ptotal)

    td.appendChild(div1)
    td.appendChild(div2)
    tr.appendChild(td)
    return tr
  }
}

export function buildDomStar (n) {
  const PStar = document.createElement('p')
  for (let i = 0; i < n; i++) {
    const star = document.createElement('i')
    star.classList.add('fas')
    star.classList.add('fa-star')
    PStar.appendChild(star)
  }
  return PStar
}

export function createDiv (options = {}) {
  const dom = document.createElement('div')
  if (!empty(options)) {
    if (typeof (options) === 'object') {
      if (options.class) {
        if (is_array(options.class)) options.class.forEach(v => { dom.classList.add(v) })
        else dom.classList.add(options.class)
      }
      if (options.id) dom.id = options.id
    } else dom.classList.add(options)
  }
  return dom
}

export function empty (data) {
  if (typeof (data) === 'number' || typeof (data) === 'boolean') return false
  if (data == undefined) return true
  else if (data == null) return true
  else if (data == '') return true
  if (typeof (data) === 'object') {
    let count = 0
    for (const i in data) if (data.hasOwnProperty(i)) count++
    return count == 0
  }
  return false
}

export function is_array (data) {
  if (typeof (data) === 'object' && typeof (data.length) === 'number') return true
  return false
}
