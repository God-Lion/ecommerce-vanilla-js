import { empty } from './../../core/functions.js'
import * as Tag from './components.js'
class Header {
  constructor (home = null) {
    this.lists = []
    this.sections = []
    this.divs = []
    this.defDiv = false
    console.log('nana')
    console.log(home)
    console.log(empty(home))

    this.home = (!empty(home))
    console.log(this.home)
  }

  list (element, options) {
    const list = new Tag.List([], options)
    this.lists.push(list)
    this.lastList = list
    // if ( element != [] ) element.forEach(e => this.addListItem(e))

    if (typeof element === 'object') {
      if (typeof element.length !== 'undefined') {
        element.forEach(e => this.addListItem(e))
      } else {
        let attr
        for (const key in element) attr = (key === 'class') ? `${key}="${element[key]}" ` : ''
        for (const key in element) {
          // if (element.hasOwnProperty(key)) {
          if (key !== 'class' && key !== 'id') {
            this.addListItem(
              this.link(key, element[key], attr)
            )
          }
          // }
        }
      }
    }
    return this
  }

  addListItem (text) {
    const listItem = new Tag.Item(text, 'li')
    this.lastList.items.push(listItem)
    this.lastItem = listItem
    return this
  }

  link (content, href, option = null) {
    console.log(option)
    const link = new Tag.Link(content, href, option)
    return link.toHtml()
  }

  section (text) {
    const section = new Tag.Section([])
    this.sections.push(section)
    this.lastSection = section
    return this
  }

  div (content = null) {
    console.log(
      content
    )
    const div = new Tag.Div([])
    if (content != null) {
      for (const key in content) {
        // if (content.hasOwnProperty(key)) {
        const element = content[key]
        div.addItem(element)
        // }
      }
    }

    // console.log(
    //     div.addItem('lolsa').addItem('nana')
    // )
    this.divs.push(div)
    this.lastDiv = div
    this.defDiv = true
    return this
  }

  addDiv () {
    const div = new Tag.Div([])
    this.lastDiv.tags.push(div)
    this.lastItem = div
    // this.nav = navigation
    // if ( list != [] ) this.list = list
    // if (this.defDiv) {
    //     this.lastDiv.tags.push(navigation.list(list))
    //     this.lastItem = navigation
    // }
    return this
  }

  addParagraph (text) {
    const paragraph = new Tag.Item(text, 'p')
    this.lastDiv.tags.push(paragraph)
    this.lastItem = paragraph
    return this
  }

  nav (list = null) {
    const navigation = new Tag.Navigation()
    this.nav = navigation
    if (list !== []) this.list = list
    if (this.defDiv) {
      this.lastDiv.tags.push(navigation.list(list))
      this.lastItem = navigation
    }
    return this
  }

  toHtml () {
    return `
        <header>
            <div class="container">
                <nav id="nav">
                    <div class="nav-center">
                        <div class="nav-header">
                            <a href="#/">
                                <img src="../assets/img/1.png" class="logo" alt="logo" />
                                <span class="logo name">Lion Sneackers</span>
                                <!-- button class="nav-toggle"><i class="fas fa-bars"></i></button -->
                            </a>
                        </div>
                        <div class="search">
                            <form method="get">
                                <i class="fas fa-search"></i>
                                <input type="search" name="search" id="search">
                            </form>
                        </div>
                        <div class="links-container">
                            ${this.lists.map(l => l.toHtml())}
                        </div>
                        <div class="">
                            <a href="#"><i class="fas fa-bell"></i></a>
                            <a href="#"><i class="fas fa-shopping-cart"></i></a>
                            <a href="#"><i class="fas fa-user"></i></a>
                        </div>
                    </div>
                </nav>
                ${(!this.home) ? '' : banner}
            </div>
        </header>`
    // ${this.sections.map(s => s.toHtml()).join('')}
    // ${ (this.defDiv) ? this.divs.map(d => d.toHtml()).join('') : this.nav.list(this.list).toHtml() }
  }

  // ${this.nav.list(this.list).toHtml()}
  // ${this.divs.map(d =>d.toHtml()).join('')}
}

const banner = `
<div class="banner">
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div class="">
                    <img src="../assets/img/1.png" class="logo" alt="logo" />
                </div>
            </div>
            <div class="col-6">
                <div class="">
                    <span class="">Make Your</span>
                    <span class="">Feet Shine</span>
                </div>
                
                <a href="#" class="btn primary">Shop Now</a>
            </div>
        </div>
    </div>
</div>
`

Header.withTopic = (home) => new Header(home)

// console.log(
//     Header.withTopic()
//     .list(
//         {
//             'home': '#pages/index',
//             'Post': '#posts/index'
//         }
//         // ['lala','lolo']
//     , {
//         class: 'links'
//     })
//     .toHtml()
// );

export function header (home = null) {
  return Header.withTopic(home)
    .list(
      {
        Store: '#stores',
        Features: '#posts/index',
        About: '#pages/index',
        Blog: '#posts/index',
        News: '#posts/index',

        class: 'scroll-link'
      }, {
        class: 'links'
      }
    ).toHtml()
}
// .nav(['lala','lolo'])
// .div().addDiv()
// .section()
// .div().nav(['MAla','Molo', 'kaka'])

// console.log(
//     Header.withTopic()

//     // .div().nav()
//     // .div().addNav(['lala','lolo', 'kaka'])
//     .toHtml()

//     // Header.withTopic()
//     // // .div().addParagraph('zazA')
//     // .div().nav()
//     // // .div().addNav(['lala','lolo', 'kaka'])
//     // // .addNav(['lala','lolo', 'kaka'])
//     // .toHtml()
// );

// console.log(
//     new Tag.Navigation().list(['lala','lolo']).addListItem('lokod').toHtml()
// );
