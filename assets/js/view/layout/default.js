// import * as Tag from './../components/components.js'
import { header } from './../components/header.js'
import { footer } from './../components/footer.js'
export function loadLayaout (controller) {
  document.querySelector('main#content').innerHTML += `
        ${header()}
        <main role="main">${controller.Session.flash()}</main>
        ${footer()}
    `
}
