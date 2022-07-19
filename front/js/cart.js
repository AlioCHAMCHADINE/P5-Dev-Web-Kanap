// Affichage des produits dans le panier:

// Récupéreration des produits du localStorage

console.log(window.location);
const params = window.location.href;
console.log(params);

const url = new URL(params);
console.log(url);
const id = url.searchParams.get("_id");

// const urlOrigin = "http://localhost:3000/api/products/${id}";

     


let products = JSON.parse(localStorage.getItem("produit"));
console.table(products);



for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let couch = document.getElementById("cart__items");
    // const urlChoice = urlOrigin + "/" + couch.$/{id};
    // const urlChoice = urlOrigin + "/" + couch.id;
    // console.table(urlOrigin);

   //  3.  fetch pour l'affichage des produits de local storage:
//    fetch(urlOrigin)
//    .then((response) => {
//     console.log(response);
//     return response.json();
//    })
//   .then((couch) => {
//     // const myChoice = couch;
//     console.log(couch);

    // fetch ("http://localhost:3000/api/products/${id}")
    fetch (`http://localhost:3000/api/products`)
    .then((res) => res.json())
    .then((couch) => {
        // console.table(couch);
    //     const template = document.querySelector("#article-product");
    
    //     let chercherProduits = () => {
    //       return couch
    //   }
    // .then((response) => response.json())
    // .then((objetProduits) => {
  
    //   // information en console sous forme tableau:
      console.table(couch);
      
  

  couch.innerHTML += `<article class="cart__item" data-id="${couch.id}" data-color="${couch.color}">
  <div class="cart__item__img">
    <img src= "${couch.imageUrl}" alt="${couch.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${couch.name}</h2>
      <p>${couch.color}</p>
      <p>${couch.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value= ${couch.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;


      // 4.  prix total quantité totale
      

      
        couch.innerHTML+=`<div class="cart__price">
        <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
      </div>`
      

      // 4. Créer des fonctions qui permettent de modifier la quantité et supprimer les produits du panier
    
    } )};