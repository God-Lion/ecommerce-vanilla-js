export class Link {
  constructor (text, link, option) {
    this.text = text
    this.link = link
    this.option = option
  }

  toHtml () { return `<a href="${this.link}" ${this.option}>${this.text}</a>` }
}

export class List {
  constructor (items, options = {}) {
    this.attr = ' '
    this.items = items
    for (const k in options) if (k !== 'type') this.attr += `${k}="${options[k]}" `
  }

  toHtml () { return `<ul ${this.attr}>${this.items.map(i => i.toHtml()).join('')}</ul>` }
}

export class Item {
  constructor (text, type) {
    this.text = text
    this.emphasis = false
    this.type = type
  }

  toHtml () { return `<${this.type}>${this.emphasis ? '<em>' : ''}${this.text}${this.emphasis ? '</em>' : ''}</${this.type}>` }
}

export class Section {
  constructor (tags, header = null) {
    this.tags = tags
    this.header = header
  }

  toHtml () {
    return `
        <section>
            ${(this.header != null) ? '<h2>' + this.header + '</h2>' : ''}
            ${this.paragraphs.map(p => p.toHtml()).join('')}
        </section>`
  }
}

export class Div {
  constructor (tags, header = null) {
    this.tags = tags
    this.header = header
  }

  addItem (text) {
    const listItem = new Item(text, 'div')
    this.tags.push(listItem)
    // this.tags = listItem

    console.log(
      // listItem.toHtml()
      this.tags
    )
    // this.tags.push(listItem)
    // this.tags = listItem
    return this
  }

  toHtml () {
    return `
        <div>
            ${(this.header != null) ? '<h2>' + this.header + '</h2>' : ''}
            ${this.tags.map(t => t.toHtml()).join('')}
        </div>`
  }
}

export class Navigation {
  constructor () {
    this.lists = []
  }

  list (element) {
    const list = new List([])
    this.lists.push(list)
    this.lastList = list
    if (element !== []) element.forEach(e => this.addListItem(e))
    return this
  }

  addListItem (text) {
    const listItem = new Item(text, 'li')
    this.lastList.items.push(listItem)
    this.lastItem = listItem
    return this
  }

  toHtml () { return `<nav>${this.lists.map(l => l.toHtml()).join('')}</nav>` }
}

// console.log(
//     new Div('o', [])
//     .toHtml()
// );

// console.log(
//     new Navigation().list(['lala','lolo']).addListItem('lokod').toHtml()
// );
