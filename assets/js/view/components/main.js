// import * as Tag from './components.js'
class Main {
  constructor (content) {
    this.content = content
  }

  toHtml () {
    return `
        <main id="lala">
            <h1>${this.content}</h1>
            <h1>hello Main</h1>
        </main>
        `
  }
}

Main.withInit = content => new Main(content)

export function main (content = null) { return Main.withInit(content).toHtml() }
