const tabs = document.querySelectorAll('.tabs a')
const a = tabs[0]
a.classList.add('active')
const main = a.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
main.querySelector('.tab-content').classList.add('active')
tabs.forEach(a => { a.addEventListener('click', function (e) { printTab(this) }) })

const printTab = function (a, animations) {
  if (animations === undefined) animations = true
  const li = a.parentNode
  const main = a.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
  const activetab = main.querySelector('.tab-content.active')
  const print = main.querySelector(a.getAttribute('href'))
  if (li.classList.contains('active')) return false
  main.querySelector('.tabs .active').classList.remove('active')
  li.classList.add('active')
  if (animations) {
    activetab.classList.add('fade')
    activetab.classList.remove('in')
    const transitionend = function (argument) {
      this.classList.remove('fade')
      this.classList.remove('active')
      print.classList.add('active')
      print.offsetWidth
      print.classList.add('in')
      activetab.removeEventListener('transitionend', transitionend)
      activetab.removeEventListener('webkitTransitionend', transitionend)
      activetab.removeEventListener('oTransitionend', transitionend)
    }
    activetab.addEventListener('transitionend', transitionend)
    activetab.addEventListener('webkitTransitionend', transitionend)
    activetab.addEventListener('oTransitionend', transitionend)
  } else {
    print.classList.add('active')
    activetab.classList.remove('active')
  }
}

// let hashChange = function(e) {
//         let hash = window.location.hash
//         let a = document.querySelector('a[href="'+ hash +'"]')
//         if (a !== null && !a.classList.contains('active'))
//         printTab(a, e !== undefined)
// }
// window.addEventListener('hashchange', hashChange)
// hashChange()

const year = document.querySelector('#date')
year.innerHTML = new Date().getFullYear()

function time () {
  const hours = document.querySelector('#hours')
  const minutes = document.querySelector('#minutes')
  const secondes = document.querySelector('#secondes')
  hours.innerHTML = new Date().getHours()
  minutes.innerHTML = new Date().getMinutes()
  secondes.innerHTML = new Date().getSeconds()
}
// let idTimeInterval = setInterval(time, 1000)
