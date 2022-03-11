export function loadview (controller) {
  // console.log( controller );
  document.querySelector('main[role="main"]').innerHTML += html
}

const html = `
<main class="row">
    <section class="row containe r store">
        <section class="col-3 filter">
            <div class="header">
                <h3 class="title">Filter</h3>
                <button><i class="fas fa-sync"></i></button>
            </div>
            <div class="category">
                <div class="header">
                    <button><i class="fas fa-chevron-down"></i></button>
                    <h3 class="title">Categories</h3>
                    <button><i class="fas fa-icons"></i></button>
                </div>
                <nav>
                    <ul>
                        <li class="active"><a>LifeStyle</a><span>1<span></li>
                        <li><a>Football</a><span>22<span></li>
                        <li><a>running</a><span>22<span></li>
                    </ul>
                </nav>
            </div>
            <div class="price">
                <div class="header">
                    <button><i class="fas fa-chevron-down"></i></button>
                    <h3 class="title">Price</h3>
                    <button><i class="fas fa-icons"></i></button>
                </div>
                <div class="fil">
                    <div><input type="text"/></div>
                    <div><input type="text"/></div>
                    <div><input type="range"/></div>
                </div>
            </div>
            
        </section>
        <section class="col-9 products">
            <div class="col-12 p-0">
                <a href="#" class="col-4 case">
                    <div>
                        <div class="img">
                            <img src="../assets/img/adidas/1.png">
                        </div>
                        <div class="description">
                            <div class="name"><p>air force one</p></div>
                            <div class="price"><p>$</p><p>120.8</p></div>
                        </div>
                    </div>
                    <div class="case-hover">
                        <div class="row">
                            <div class="title">
                                <p>Lifestyle</p>
                            </div>
                        </div>
                        <div class="row">
                            <div>
                                <button><i class="fas fa-shopping-cart"></i><label>buy</label></button>
                                <button><i class="fas fa-heart"></i></button>
                            </div>
                        </div>
                        <div class="row description">
                            <div class="name"><p>air force one</p></div>
                            <div class="price"><p>$</p><p>120.8</p></div>
                        </div>
                        
                    </div>
                </a>


                

                
           
            </div>
        </section>
    </section>
</main>
`

class Product {
  static async init () {
    const promise1 = new Promise((resolve, reject) => {
      console.log(
        // document.querySelectorAll('main')
        document.querySelector('.products')

      )
      setTimeout(() => {
        resolve('foo')
      }, 300)
    })

    promise1.then((value) => {
      console.log(value)
      // expected output: "foo"
    })

    // console.log(promise1);
    console.log(
      document.querySelector('.products')
    )
    // const products = Array.from( document.querySelectorAll('.case-art'))
    // products.forEach( product => product.addEventListener('click', e => {
    //     // e.preventDefault()
    //     new Product( e.currentTarget.getAttribute('href') )
    // }))
  }
}

Product.init()
