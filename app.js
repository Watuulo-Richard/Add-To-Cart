const addCartBtn = document.getElementById("addCartBtn")
const cartContainer = document.querySelector(".cart")
const loader = document.querySelector(".loader")
const productContainer = document.querySelector(".cart-container")
const myContainer = document.querySelector(".cart-products")
const total = document.querySelector(".total")
const closeBtn = document.getElementById("close-button")
const hamburgMenuButton = document.querySelector(".hamburg-menu")
const navLinksContainer = document.querySelector(".nav-links")
const popUpElement = document.querySelector(".pop-up")

hamburgMenuButton.addEventListener('click', function(){
    navLinksContainer.classList.toggle("nav-links")
})

closeBtn.addEventListener('click', function(){
    const toggleBtn = cartContainer.classList.toggle('visible')
    console.log(toggleBtn)
    console.log("btn clicked")
})
function showLoader(){
    loader.classList.add('loader')
}

function hideLoader(){
    loader.classList.remove('loader')
}
addCartBtn.addEventListener('click', ()=>{
    cartContainer.classList.toggle('visible')
    
})
console.log(addCartBtn)

const cartBorder = document.querySelector(".cart-product")


showLoader()
fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(productsVariable=>{
            hideLoader()
            displayProductsOnUI(productsVariable)
        })

let cartArray = JSON.parse(localStorage.getItem('newItems')) || [];
// console.log(cartArray)

displayAddToCartItemsOnUI(cartArray)

function displayProductsOnUI(newArray) {
    newArray.forEach((product) => {
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `
            <div class="cart-item">
                <div class="cart-image">
                    <img src="${product.image}" alt="">
                </div>
                <div class="cart-text">
                    <h2 class="line-clamp">${product.title}</h2>
                        <p>${product.price}</p>
                        <p class="line-clamp">${product.description}</p>
                        <button type="button" onclick="addMyProduct('${product.title}'  , '${product.image}' , '${product.price}', '${product.id}')" id="addCartBtn" class="btn"><i class="fa-solid fa-cart-arrow-down"></i> Add To Cart</button>
                      
                    </div>
            </div>
        `
        productContainer.appendChild(div)
    })
     
}


function displayAddToCartItemsOnUI(data){
    const myContainer = document.querySelector(".cart-products")
    myContainer.innerHTML = ''
    data?.forEach((product) => {
        const div = document.createElement('div')
        div.innerHTML= `
            <div class="cart-product">
                    <div class="cart-image-product">
                        <img src="${product.image}" alt="">
                    </div>
                    <div class="cart-text-product">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <button type="button" onclick="deleteCart(${product.id})" class="btn"><i class="fa-solid fa-trash-can"></i>Delete</button>
                    </div>
            </div>
        `
        myContainer.appendChild(div)
        calculateTotal()
    })

}

function addMyProduct(title , image , price, id){
    console.log(title , image , price, id)
    id = Number(id)
    const newObj={
        image:image,
        name:title,
        price:price,
        id: id,
    }
    cartArray.push(newObj)
    displayAddToCartItemsOnUI(cartArray)
    localStorage.setItem('newItems', JSON.stringify(cartArray))
    // console.log(id)
    console.log(cartArray)
    calculateTotal()
    popUpElement.classList.toggle('show')
    setTimeout(()=>{
        popUpElement.classList.remove('show')
    }, 3000)
   
}
console.log(total)
function calculateTotal(){
    let totalPrice = 0
    cartArray.forEach((product)=>{
        totalPrice += parseFloat(product.price)
    })
    total.textContent = `Total Amount: $${totalPrice}`
}

function deleteCart(id) {
    cartArray = cartArray.filter((product)=>product.id != id)
    localStorage.setItem('newItems', JSON.stringify(cartArray))
    displayAddToCartItemsOnUI(cartArray)
    // console.log("button clicked")
}


