const baseURL = "https://dummyjson.com/products";
const productsContainer = document.getElementById("productsContainer");
const limit = 12;

const paginationDiv = document.createElement("div");

function createPaginationContainer(info) {
  paginationDiv.setAttribute("class", "pagination-div");
  info.forEach((item) => {
    const btn = document.createElement("button");
    btn.setAttribute("class", "class-button");
    btn.innerText = item.name;
    btn.addEventListener("click", () => {
      paintData(createUrl(item.name));
    });
    paginationDiv.appendChild(btn);
  });
  return paginationDiv;
}

function createUrl(page) {
  const skip = (page - 1) * limit;
  return `${baseURL}?limit=${limit}&skip=${skip}`;
}

const firstURL = createUrl(1);
paintData(firstURL, true);

function paintData(url, firstLoad = false) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("err");
    })
    .then((data) => {
      productsContainer.textContent = "";
      if (firstLoad) {
        createPagination(data.total);
      }
      data.products.forEach((product) => {
        renderProductCard(product);
      });
    });
}
   

function createPagination(totalProducts) {
  const pages = Math.ceil(totalProducts / limit);
  let paginationItems = [];
  for (let i = 1; i <= pages; i++) {
    const paginationItem = {
      name: i,
      href: "",
    };
    paginationItems.push(paginationItem);
  }
  const pagesDivContainer = createPaginationContainer(paginationItems);
  const main = document.getElementById("main");
  main.appendChild(pagesDivContainer);
}

function renderProductCard(product) {
  const productCard = document.createElement("div");
  const productImage = document.createElement("img");
  const productLink = document.createElement("a");
  productLink.setAttribute("href", `details.html?id=` + product.id);

  const productDescription = document.createElement("P");
  productCard.setAttribute("class", "product-card");
  // ---------------------------------------------------------------------------------------------------------

  console.log(product.rating);


  
  const heartButton = document.createElement("button");
  heartButton.innerHTML = `<i class="fa-regular fa-heart"></i>`;
  heartButton.setAttribute("class", "heart");


 
  if(localStorage.getItem(product.id) === "true"){
    heartButton.classList.toggle("heart-color");
  }
  heartButton.addEventListener("click", () => {
    if (localStorage.getItem(product.id) === "true") {
      localStorage.setItem(product.id, "false");
    } else {
      localStorage.setItem(product.id, "true");
    }
    heartButton.classList.toggle("heart-color");
  });

  productImage.src = product.thumbnail;
  productLink.innerHTML = `<h3>${product.title}</h3>
  <p class='price'><span>&#36;</span>${product.price}</p> `;

  productDescription.textContent = product.description;

  productCard.appendChild(productImage);
  productCard.appendChild(productLink);
  productCard.appendChild(productDescription);
  productCard.appendChild(heartButton);
  productsContainer.appendChild(productCard);
}
