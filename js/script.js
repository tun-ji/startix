let menu = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')
let mockDB = []


menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navbar.classList.toggle('active')
}

window.onscroll = () => {
    menu.classList.remove('bx-x')
    navbar.classList.remove('active')
}

/** This section handles the cart logic. It handles the logic */
const incrementBtns = document.querySelectorAll('.increment')
const decrementBtns = document.querySelectorAll('.decrement')
const quantityElements = document.querySelectorAll('.quantity')
const cartCountElement = document.getElementById('cart-count')
const addToCartBtns = document.querySelectorAll('.cart')
let cartCount = 0

incrementBtns.forEach((incrementBtn, index) => {
    incrementBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityElements[index].textContent)
        quantity++;
        quantityElements[index].textContent = quantity
    })
})

decrementBtns.forEach((decrementBtn, index) => {
    decrementBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityElements[index].textContent)
        if (quantity > 1) {
            quantity++;
            quantityElements[index].textContent = quantity
        }
    })
})

addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener('click', () => {
        cartCount++
        const productBox = addToCartBtn.closest('.box')
        const productName = productBox.querySelector('h4').textContent
        const productPrice = productBox.querySelector('h5').textContent
        const productQuantity = productBox.querySelector('.quantity').textContent
        const product = {
            name: productName,
            price: parseFloat(productPrice.split(" ")[0]),
            quantity: parseInt(productQuantity)
        }

        addToCart(product)
        updateCartCount()
    })
})

const addToCart = (product) => {
    // Check if the item exists
    console.log(product)
    let exists = false
    mockDB.forEach((item) => {
        if (item.name == product.name) {
            item.quantity+=product.quantity
            console.log('Updated', product.name)
            exists = true
        }
    })

    if (exists == false) {
        mockDB.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(mockDB))

    return console.log('Cart:', mockDB)
}

const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    cartCount = cart.length
    localStorage.setItem('cartCount', cartCount)
    cartCountElement.textContent = localStorage.getItem('cartCount')
}

const renderCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const cartItemsElement = document.querySelector('.cart-items');
    cartItemsElement.innerHTML = '';
    
    cart.forEach((item) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
    
        const itemNameElement = document.createElement('h4');
        itemNameElement.textContent = item.name;
    
        const itemPriceElement = document.createElement('p');
        itemPriceElement.textContent = `${item.price.toFixed(2)} NGN`;
    
        const itemQuantityElement = document.createElement('p');
        itemQuantityElement.textContent = `Quantity: ${item.quantity}`;
    
        cartItemElement.appendChild(itemNameElement);
        cartItemElement.appendChild(itemPriceElement);
        cartItemElement.appendChild(itemQuantityElement);
        cartItemsElement.appendChild(cartItemElement);
    });
  }
  
  // Function to calculate and update the total amount in the cart
  function updateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const totalAmountElement = document.getElementById('total-amount');
    const totalAmount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
    totalAmountElement.textContent = `${totalAmount.toFixed(2)} NGN`;
  }

  if (window.location.pathname.includes('cart.html')) {
    console.log('cart')
    console.log(JSON.parse(localStorage.getItem('cart')))
    renderCartItems()
    updateCartCount()
    updateTotalAmount()
}
