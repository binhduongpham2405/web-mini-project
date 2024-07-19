const products=[
    {id: 1, name: 'T-Shirt', price: 300000},
    {id: 2, name: 'Shirt', price: 200000},
    {id: 3, name: 'Jeans', price: 500000},
    {id: 4, name: 'Trousers', price: 450000},
    {id: 5, name: 'Shocks', price: 20000},
    {id: 6, name: 'Jacket', price: 200000}
]
const  payments=[
    {id: 1, name: 'Credit card'},
    {id: 2, name: 'Paypal'},
    {id: 3, name: 'Momo'},
    {id: 4, name: 'Cash on Delivery'},
    {id: 5, name: 'Online Payment'}
]
const customers=[
    {id: 1, name:'Jack Grealish'},
    {id: 2, name:'Tom Holland'},
    {id: 3, name:'Kylian Mbape'},
    {id: 4, name:'Harry Kane'},
    {id: 5, name:'Phil Foden'}
]
let cart=[]
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

function generateProducts(){
    const productList=document.getElementById('product-list')
    products.forEach(product =>{
        const li=document.createElement('li')
        li.innerHTML=`${product.name}: ` + product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}) + `  <br><button onclick="addToCart(${product.id})">Add to Cart</Button>`
        productList.appendChild(li)
    })
}
function generateCustomers(){
    const customerList=document.getElementById('customer')
    customers.forEach(customer =>{
        const option=document.createElement('option')
        option.value=customer.id
        option.textContent=customer.name
        customerList.appendChild(option)

    })
}
function generatePaymentMethods(){
    const  paymentMethods=document.getElementById('payment-method')
    payments.forEach(payment =>{
        const option=document.createElement('option')
        option.value=payment.id
        option.textContent=payment.name
        paymentMethods.appendChild(option)
    })
}
function addToCart(productId){
    const product=products.find(p => p.id === productId)
    const cartItem=cart.find(item => item.product.id === productId)
    if(cartItem){
        cartItem.quantity++
    } else{
        cart.push({product,quantity:1})
    }
    renderCart()
}
function renderCart(){
    const cartList=document.getElementById("cart-list");
    cartList.innerHTML=""
    cart.forEach(item=>{
        const li=document.createElement("li")
        li.innerHTML=`${item.product.name} ` + item.product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})+ `x ${item.quantity} <button onclick="removeFromCart(${item.product.id})">Remove</button> <button onclick="deleteFromCart(${item.product.id})">Delete</button>`
        cartList.appendChild(li)
    }

    )
}
function removeFromCart(productId) {
    const index = cart.findIndex(item => item.product.id === productId)
    if (index !== -1) {
        cart.splice(index, 1)
        renderCart()
    }
}
function clearCart() {
    cart = []
    renderCart()
}
function deleteFromCart(productId){
    const index = cart.findIndex(item => item.product.id === productId)
    cart.forEach(item =>{
        if(item.product.id === productId && item.quantity>0){
            item.quantity--
            renderCart()
        }
        if(item.quantity==0){
            cart.splice(index, 1)
            renderCart()
        }
    })
}
function checkout(){
    const customerId = document.getElementById('customer').value
    const paymentMethodId = document.getElementById('payment-method').value
    const customer = customers.find(c => c.id == customerId)
    const paymentMethod = payments.find(p => p.id == paymentMethodId)
    if (cart.length === 0) {
        alert('Cart is empty')
        return;
    }
    sumOfPrice=cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
    alert(`Customer ID: ${customer.name}\nPayment Method : ${paymentMethod.name}\nOrder Total: `+sumOfPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'}));
    clearCart()
}
window.onload = () => {
    generatePaymentMethods()
    generateCustomers()
    generateProducts()

};
