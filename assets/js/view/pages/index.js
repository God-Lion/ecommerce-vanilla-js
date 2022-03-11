import { main } from './../components/main.js'

export async function loadview (vars = null) {
  // console.log(vars);
  document.querySelector('main[role="main"]')
    .innerHTML += main('Pages index view')
  main('lala')
}
