import { ControllerArticle } from './Controller.js'
import { RouterArticle, RouterCart } from './Router.js'
const PerPage = 8
let page = 0; let total = 0

function resetDOMArticle () {
  const contentArticle = document.querySelector('#contentArticle')
  contentArticle.innerHTML = ''
}

function builDOMArticle (article) {
  const contentArticle = document.querySelector('#contentArticle')
  const caseArt = document.createElement('a')
  caseArt.href = `#product/name/${article.name}/id/${article.id}`
  caseArt.classList.add('col-3')
  caseArt.classList.add('case-art')
  const divImg = document.createElement('div')
  const image = new Image()
  image.src = article.image
  divImg.appendChild(image)
  const divTitle = document.createElement('div')
  divTitle.classList.add('title')
  const divMarkName = document.createElement('div')
  const PMarkName = document.createElement('p')
  PMarkName.innerHTML = article.name
  divMarkName.appendChild(PMarkName)
  divTitle.appendChild(divMarkName)
  const divStar = document.createElement('div')
  const PStar = document.createElement('p')
  for (let i = 0; i < article.star; i++) {
    const star = document.createElement('i')
    star.classList.add('fas')
    star.classList.add('fa-star')
    PStar.appendChild(star)
  }
  divStar.appendChild(PStar)
  divTitle.appendChild(divStar)
  const divPrice = document.createElement('div')
  const PPrice = document.createElement('p')
  PPrice.innerHTML = article.price
  divPrice.appendChild(PPrice)
  divTitle.appendChild(divPrice)
  caseArt.appendChild(divImg)
  caseArt.appendChild(divTitle)
  if (contentArticle !== null) contentArticle.appendChild(caseArt)
}

function builDOMCategory (category) {
  const contentCategory = document.querySelector('#allCategory')
  if (contentCategory !== null) {
    for (let i = 0; i < category.length; i++) {
      const button = document.createElement('button')
      button.classList.add('btn')
      button.classList.add('category')
      button.innerHTML = category[i]
      button.value = category[i]
      contentCategory.appendChild(button)
    }
  }
}

function resetDOMPagination () {
  const contentCategory = document.querySelector('.pagination')
  if (contentCategory !== null) contentCategory.innerHTML = ''
}

function builDOMPagination (page) {
  const contentCategory = document.querySelector('.pagination')
  for (let i = 1; i < page + 1; i++) {
    const button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('page')
    button.innerHTML = i
    button.value = i
    contentCategory.appendChild(button)
  }
}

const CntrlArticle = new ControllerArticle()

function printArticle (articles = null) {
  resetDOMPagination()
  const length = (articles === null) ? CntrlArticle.list().length : articles.length
  const a = (PerPage < articles) ? PerPage : length
  if (articles !== null) {
    total = articles.length
    page = Math.ceil(total / PerPage)
    for (let i = 0; i < a; i++) builDOMArticle(articles[i])
  } else {
    total = CntrlArticle.list().length
    page = Math.ceil(total / PerPage)
    for (let i = 0; i < a; i++) builDOMArticle(CntrlArticle.list()[i])
  }
  if (page > 1) builDOMPagination(page)
  document.querySelectorAll('.pagination .page').forEach(page => {
    page.addEventListener('click', function (e) {
      resetDOMArticle()
      let start = 0; let length = 0
      if (page.value == 1) start = 0
      else start = PerPage * (page.value - 1)
      if (articles === null) length = CntrlArticle.list().length
      else length = articles.length
      const max = ((page.value * PerPage) > length) ? length : (page.value * PerPage)
      for (let i = start; i < max; i++) {
        if (articles === null) builDOMArticle(CntrlArticle.list()[i])
        else builDOMArticle(articles[i])
      }
    })
  })
}

builDOMCategory(CntrlArticle.category())

printArticle()

document.querySelector('#search').addEventListener('keyup', function (e) {
  resetDOMArticle()
  if (this.value == '') printArticle()
  else printArticle(CntrlArticle.search(this.value))
})

document.querySelectorAll('#allCategory button').forEach(category => {
  category.addEventListener('click', function (e) {
    resetDOMArticle()
    if (this.value == 'all') printArticle()
    else printArticle(CntrlArticle.searchCategory(this.value))
  })
})

// document.querySelectorAll('#contentArticle .case-art').forEach( article => {
//   article.addEventListener('click', function (e) {
//     console.log( article )
//   })
// })
// console.log( document.querySelectorAll('#contentArticle .case-art') )

RouterArticle.init()
new RouterCart()
