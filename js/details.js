
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
// console.log(id);

fetch(`https://dummyjson.com/products/${id}`)
.then(res => res.json())
.then( res=>displayProductDetails(res));

function displayProductDetails (product){
  const mainImg = document.getElementById("mainImg");
   mainImg.src = product.thumbnail;

   let imgGallery  = document.getElementById("imgGallery");
  product.images.forEach(imgLink => {
  let singleIMG = document.createElement("img");
  singleIMG.src = imgLink;
  imgGallery.appendChild(singleIMG);
  singleIMG.addEventListener('click',  ()=>{
    mainImg.src = singleIMG.src;
  })
 });

// product-info 
const title = document.getElementById("title");
title.textContent = product.title;
const description = document.getElementById("description");
description.textContent = product.description;

const price = document.getElementById("price");
price.innerHTML = `Price: <span>&#36;</span>${product.price}`
const discount = document.getElementById("discount");
discount.innerHTML = `${product.discountPercentage} <span>&#37;</span>off`;

const rating = document.getElementById("rating");
rating.innerHTML = `Rating<span>&#58;</span> ${product.rating}`;


const stock = document.getElementById("stock");
stock.innerHTML = `Stock<span>&#58;</span> ${product.stock}`;

const brand = document.getElementById("brand");
brand.innerHTML = `Brnad<span>&#58;</span> ${product.brand}`;

const category = document.getElementById("category");
category.innerHTML = `Category<span>&#58;</span> ${product.category}`;
};


