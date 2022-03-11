// import * as Tag from './components.js'
class Footer {
  // constructor () {}

  toHtml () {
    return `
        <footer>
            <h1>hello footer</h1>
        </footer>`
  }
}

Footer.withTopic = () => new Footer()

export function footer () {
  return Footer.withTopic().toHtml()
}
