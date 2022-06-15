// Object propery shorthand

const name = "Mattias"
const userAge = 26

const user = {
    name, 
    age: userAge,
    location: "Svedala"
}

console.log(user)

// Object destrucuring

const product = {
    label: "Notebook",
    price: 3,
    stock: 201,
    salePrice: undefined,
    rating: 4.5
}

// const label = product.label
// const stock = product.stock

// const {label:productLabel, stock, rating = 5} = product
// console.log(productLabel)
// console.log(stock)
// console.log(rating)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)