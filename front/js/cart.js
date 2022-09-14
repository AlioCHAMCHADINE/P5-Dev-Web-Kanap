// let product = JSON.parse(localStorage.getItem("produit"));
// console.table(product)
// let structureProduitPanier = [];
// let totalQuantite = document.getElementById("totalQuantity");
//       let totalPrix = document.getElementById("totalPrice");
//       let cartContainer = document.getElementById("cart__items");


//                      function getProductById(idProduit){
                      
                    
//                           //Requête API pour le JSON des produits à afficher les infos de chaque produits ajoutés
//                            fetch (`http://localhost:3000/api/products/${idProduit}`)
//                             .then((res) => res.json())
//                             .then((couch) =>{
    
//                                         // affichagePanier.innerHTML +=couch.price+
//                                         let priceElt= document.createElement("p")
//                                         let priceContent= document.createTextNode(couch.price)
//                                         priceElt.appendChild(priceContent)
//                                         let cartItem=document.getElementById("cart__items")
//                                         cartItem.appendChild(priceElt)
                                          
//                                           // return couch.price 
                                                                    
                                              
//                      })};
                     
                      
// // //Déclaration de la variable qui contient le résultat de la fonction requête
// let affichagePrix=document.getElementById("cart__items")
// for(i=0; i<product.length; i++){
// let test = getProductById(product[i].id)}


//                     function afficherPanier(){ 
                      
                    
//                       if(product === null || product == 0 ) {
//                         console.log("le panier est vide");
//                         const panierVide = `<div class= "container-panier-vide">
//                                                 <h2> Le panier est vide </h2>
//                                             </div)
//                                             `;
//                           let totalQuantite = document.getElementById("totalQuantity");
//                           let totalPrix = document.getElementById("totalPrice")
//                           totalQuantite.innerHTML= 0;
//                           totalPrix.innerHTML=  0
                        
//                         cartContainer.innerHTML = panierVide;
                        
//                         } 
//                         // //Si le panier n'est pas vide, il faut afficher les produits qui sont DANS le localStorage
//                         else {
//                         console.log("le panier possède des articles")
//                         let structureProduitPanier = [];
//                         console.log(structureProduitPanier);
                        
//                         for (k = 0; k < product.length; k++) {
//                             console.log("Nombre d'article " +  product.length);
//                           }
//                           };
//                           afficherPanier();

//                         }
//                           calculPrix();
                        
//                         function calculPrix(){
                          
//     //Calcul du prix , quantité * nombre de produit
//     let quantityProduct = parseInt(product[k].quantity);
//     let idProduit = product[k].id;
//   let prix = getProductById(idProduit)
// console.log(prix)
                       
                        
//                         //     //On utilise la variable pour incrémenter autant de bloc html que de produit
//                             structureProduitPanier = structureProduitPanier + `
//                             <article class="cart__item" data-id="${product[k].id}" data-color="${product[k].colors}">
//                                     <div class="cart__item__img">
//                                       <img src="${product[k].image}" alt="${product[k].altImage}">
//                                     </div>
//                                     <div class="cart__item__content">
//                                       <div class="cart__item__content__description">
//                                         <h2>${product[k].name}</h2>
//                                         <p>${product[k].colors}</p>
//                                         <p id="price">${prix + " €"}</p>
//                                       </div>

//                                       <div class="cart__item__content__settings">
//                                         <div class="cart__item__content__settings__quantity">
//                                           <p>Qté : </p>
//                                           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProduct}">
//                                         </div>
//                                         <div class="cart__item__content__settings__delete">
//                                           <p class="deleteItem">Supprimer</p>
//                                         </div>
//                                       </div>
//                                     </div>
//                             </article>
//                             `;
                            
                          
//                         } 
//                             if(k == product.length){
                            
//                                 //injection html dans la page panier
//                             cartContainer.innerHTML= structureProduitPanier;
//                         }
                        
                        
//                         } ;
                        
                        
//                         suppression();                     
//  // fin else
 
 
//   function suppression(){
    
//   let btn_supprimer = document.querySelectorAll('.deleteItem');
//   console.log(btn_supprimer);
  
//   for (let d = 0; d < btn_supprimer.length; d++) {
//   btn_supprimer[d].addEventListener("click", (event) =>{
//     //évite le rechargement de la page
//     event.preventDefault();
  
//     //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton supprimer
//     let id_productToDelete = product[d]._id
//     let color_productToDelete = product[d].colors
//     console.log("Suppression de l'article ayant l'id ci-dessous")
//     console.log(id_productToDelete);
    
  
//   //   //Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué
//     product = product.filter( element=> element._id !== id_productToDelete || element.colors !== color_productToDelete);
    
//   //   //on envoie la variable dans le localStorage
//   //   //La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
//     localStorage.setItem ("produit", JSON.stringify(product));
   
//   //   // Alerte pour avertir que le produit a été supprimé et rechargement de la page
//     alert ("l'article a bien été supprimé")
//     window.location.href= "cart.html"
    
    
    
//   })
// };

// //Fin addEvent click Bouton supprimer
  
// //Affichage quantité total et prix total


// //Sélection des éléments dans le DOM pour afficher la quantité/prix total
// let total = () => {
  
//   let totalQuantite = document.getElementById("totalQuantity");
//   let totalPrix = document.getElementById("totalPrice")
//   let priceContainer = document.getElementById("price")
//   let sommeQuantite = 0;
//   let sommePrix = 0;
//   //Sélection des blocs contenant le prix des articles de la liste

  
//   for (let p in product) {
    
//     let price = product[p].price;
//     let objectTotal = parseInt(product[p].quantity);
    
//     sommeQuantite  += objectTotal;
//     sommePrix += price;
//     console.log("Addition")
//     console.log(sommePrix)
//   }
  
//   totalPrix.innerHTML= sommePrix
//   totalQuantite.innerHTML = sommeQuantite
  
// }

// total();
// //Gestion des boutons pour modifier la quantités


// //Sélection des champs de valeurs

// let modifyQuantityButton = document.querySelectorAll(".itemQuantity"); 
// console.log(modifyQuantityButton);

// addEventListener("change", ()=> {
 
// changeQuantity();
// total()
// }) 

  
// function changeQuantity() {
  
// for (let c in product) {
//   //Renvoi 100 si l'utilisateur tente de dépasser 100 artcles
//     if (modifyQuantityButton[c].value > 100) {
//       modifyQuantityButton[c].value = 100
//     } 
//     //Renvoi 1 si l'utilisateur sélectionne 0 articles
//     if (modifyQuantityButton[c].value == 0) {
//       modifyQuantityButton[c].value = 1
//     } 
//     if (modifyQuantityButton[c].value < 0) {
//       modifyQuantityButton[c].value = 1
//     }
//     else {
//       product[c].quantity = parseInt(modifyQuantityButton[c].value);
//       product[c].price = product[c].quantity * product[c].price;
      
//     }
    
//     localStorage.setItem ("produit", JSON.stringify(product));}
    
    
   
   
//   }//fin modifyQuantity  */
     
  
  
// };



//fin fetch
