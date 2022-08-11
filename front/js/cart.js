// Affichage des produits dans le panier:

// Récupéreration des produits du localStorage


let params = window.location.href;
let url = new URL(params);
let id = url.searchParams.get("_id");
console.log(id);


//On récupére les infos stockées dans le localStorage
let product = JSON.parse(localStorage.getItem("produit"));
console.table(product)

// Fonction ajouter un produit dans le local Storage
const ajoutProduitLocalStorage = () => {

// Ajout dans le tableau de l'objet avec les valeurs choisi par l'utilisateur
product.push(productOptionChoices);

//La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
localStorage.setItem ("produit", JSON.stringify(product));
}

//Création du tableau de commande pour le POST pour récupérer l'id de chaque produit de la commande
let products = [] 
console.log(products)
//Sélection dans le DOM du conteneur des articles ajoutés
let cartContainer = document.getElementById("cart__items")

for (let n in product) {
let productInStorage = [product[n]._id]
products.push(productInStorage)
}


function recupererPrix(idProduit){
//Requête API pour le JSON des produits à afficher les infos de chaque produits ajoutés
fetch (`http://localhost:3000/api/products/${idProduit}`)
  .then((res) => res.json())
  .then((couch) => {
    console.log(couch)
    return couch.price
    // let retournerProduit=()=>{
    //   couch.price
    // }
    // return couch 
  })}
// fetch('http://localhost:3000/api/products/')
//     .then((res) => res.json())
//     .then ((couch) => {
//         let chercherProduits = () => {
//             return couch
//         }

//Déclaration de la variable qui contient le résultat de la fonction requête

// let trouverProduits = chercherProduits()

// Si le panier est vide : Afficher le panier est vide

if(product === null || product == 0 ) {
console.log("le panier est vide");
const panierVide = `<div class= "container-panier-vide">
                        <h2> Le panier est vide </h2>
                    </div)
                    `;
  let totalQuantite = document.getElementById("totalQuantity");
  let totalPrix = document.getElementById("totalPrice")
  totalQuantite.innerHTML= 0;
  totalPrix.innerHTML=  0

cartContainer.innerHTML = panierVide;

} 
//Si le panier n'est pas vide, il faut afficher les produits qui sont DANS le localStorage
else {
console.log("le panier possède des articles")
let structureProduitPanier = [];
console.log(structureProduitPanier);

for (k = 0; k < product.length; k++) {
    console.log("Nombre d'article " +  product.length);
    
    //Calcul du prix , quantité * nombre de produit
    let quantityProduct = parseInt(product[k].quantity);
    let idProduit = product[k].id;
    let prix = recupererPrix(idProduit)
console.log(prix)
    //On utilise la variable pour incrémenter autant de bloc html que de produit
    structureProduitPanier = structureProduitPanier + `
    <article class="cart__item" data-id="${product[k].id}" data-color="${product[k].colors}">
            <div class="cart__item__img">
              <img src="${product[k].image}" alt="${product[k].altImage}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product[k].name}</h2>
                <p>${product[k].colors}</p>
                <p id="price">${prix + " €"}</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantityProduct}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
    </article>
    `;
    
    
} 
    if(k == product.length){
    
        //injection html dans la page panier
    cartContainer.innerHTML= structureProduitPanier;
}



}// fin else


let btn_supprimer = document.querySelectorAll('.deleteItem');
console.log(btn_supprimer);

for (let d = 0; d < btn_supprimer.length; d++) {
btn_supprimer[d].addEventListener("click", (event) =>{
  //évite le rechargement de la page
  event.preventDefault();

  //Sélection de l'id du produit qui va être supprimer en cliquant sur le bouton supprimer
  let id_productToDelete = product[d]._id
  let color_productToDelete = product[d].colors
  console.log("Suppression de l'article ayant l'id ci-dessous")
  console.log(id_productToDelete);
  

  //Avec la méthode filter je sélectionne les éléments à garder et je supprime l'élément où le btn suppr a été cliqué
  product = product.filter( element=> element._id !== id_productToDelete || element.colors !== color_productToDelete);
  
  //on envoie la variable dans le localStorage
  //La transformation en format JSON et l'envoyer dans la key "produit" du localStorage
  localStorage.setItem ("produit", JSON.stringify(product));
 
  // Alerte pour avertir que le produit a été supprimé et rechargement de la page
  alert ("l'article a bien été supprimé")
  window.location.href= "cart.html"
  
  
})}//Fin addEvent click Bouton supprimer
  
//Affichage quantité total et prix total

//Sélection des éléments dans le DOM pour afficher la quantité/prix total
let total = () => {
  let totalQuantite = document.getElementById("totalQuantity");
  let totalPrix = document.getElementById("totalPrice")
  let priceContainer = document.getElementById("price")
  let sommeQuantite = 0;
  let sommePrix = 0;
  //Sélection des blocs contenant le prix des articles de la liste

  
  for (let p in product) {
    
    let price = product[p].price;
    let objectTotal = parseInt(product[p].quantity);
    
    sommeQuantite  += objectTotal;
    sommePrix += price;
    console.log("Addition")
    console.log(sommePrix)
  }
  
  totalPrix.innerHTML= sommePrix
  totalQuantite.innerHTML = sommeQuantite
  
}
total();
//Gestion des boutons pour modifier la quantités


//Sélection des champs de valeurs
let modifyQuantityButton = document.querySelectorAll(".itemQuantity"); 
console.log(modifyQuantityButton);

addEventListener("change", ()=> {

changeQuantity();
total()
})
  
function changeQuantity() {

for (let c in product) {
  //Renvoi 100 si l'utilisateur tente de dépasser 100 artcles
    if (modifyQuantityButton[c].value > 100) {
      modifyQuantityButton[c].value = 100
    } 
    //Renvoi 1 si l'utilisateur sélectionne 0 articles
    if (modifyQuantityButton[c].value == 0) {
      modifyQuantityButton[c].value = 1
    } 
    if (modifyQuantityButton[c].value < 0) {
      modifyQuantityButton[c].value = 1
    }
    else {
      product[c].quantity = parseInt(modifyQuantityButton[c].value);
      product[c].price = product[c].quantity * trouverProduits[c].price;
      
    }
    
    localStorage.setItem ("produit", JSON.stringify(product));}
  }//fin modifyQuantity  */
//fin fetch



// -------------------------------------- Fin affichage panier ------------------------------------------------------

// Déclaration fonctions pour vérifier les champs de remplissage

// -------------------- Ville -------------------------- 
function villeValide() {
let ville = document.getElementById('city').value
let text = document.getElementById('cityErrorMsg')
// Prends en compte les caractère spéciaux
let pattern =
/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
//Si la ville correspond aux critères imposés, on renvoie le résultat
if (ville.match(pattern)) {
text.innerHTML = 'La ville est valide'
text.style.color = 'lightgreen'
return true	
// Si la ville ne correspond pas aux critères, message d'erreur
} else {
text.innerHTML = 'Merci de rentrer un nom de ville valide'
text.style.color = 'red'
if (ville == '') {
  text.innerHTML = ''
  }
return false
}
}

// --------------------Prénom --------------------------
function prenomValide() {
let prenom = document.getElementById('firstName').value
let text = document.getElementById('firstNameErrorMsg')
// Prends en compte les caractère spéciaux
let pattern =
/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
let number = /^[a-zA-Z\-1-9]+$/
//Si le prénom correspond aux critères imposés, on renvoie le résultat
if (prenom.match(pattern)) {
text.innerHTML = 'le prénom est valide'
text.style.color = 'lightgreen'
return true
// Si le prénom ne correspond pas aux critères, message d'erreur
} else {
if (prenom.match(number)) {
  text.innerHTML = 'Les chiffres ne sont pas tolérés'
  text.style.color = 'red'
  return false
} else {
  text.innerHTML = 'Merci de rentrer un prénom valide'
  text.style.color = 'red'
  if (prenom == '') {
    text.innerHTML = ''
    return false
  }
}}
}

// --------------------Nom -------------------------- 
function nomValide() {
let nom = document.getElementById('lastName').value
let text = document.getElementById('lastNameErrorMsg')
// Prends en compte les caractère spéciaux
let pattern =
/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
let number = /^[a-zA-Z\-1-9]+$/
//Si le nom correspond aux critères imposés, on renvoie le résultat
if (nom.match(pattern)) {
text.innerHTML = 'le nom est valide'
text.style.color = 'lightgreen'
return true
// Si le nom ne correspond pas aux critères, message d'erreur
} else {
if (nom.match(number)) {
  text.innerHTML = 'Les chiffres ne sont pas tolérés'
  text.style.color = 'red'
  return false
} else {
  text.innerHTML = 'Merci de rentrer un nom valide'
  text.style.color = 'red'
  if (nom == '') {
    text.innerHTML = ''
    return false
  }
}}
}

// -------------------- Adresse -------------------------- 

function adresseValide() {
let adresse = document.getElementById('address').value
let text = document.getElementById('addressErrorMsg')
// Prends en compte les caractère spéciaux
let pattern = /^[a-zA-Z\-1-9 ]+$/
  
//Si l'adresse correspond aux critères imposés, on renvoie le résultat
if (adresse.match(pattern)) {
  text.innerHTML = 'Adresse est valide'
  text.style.color = 'lightgreen'
return true
// Si l'adresse ne correspond pas aux critères, message d'erreur
} else {
  text.innerHTML = "L'adresse n'est pas valide"
  text.style.color = 'red'
  if (adresse == '') {
    text.innerHTML = ''
  }
  return false
}}

// -------------------- Email -------------------------- 

function emailValide() {
  let email = document.getElementById('email').value
  let text = document.getElementById('emailErrorMsg')
  // Prends en compte les caractère spéciaux
  let pattern =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  //Si l'email correspond aux critères imposés, on renvoie le résultat
  if (email.match(pattern)) {
    text.innerHTML = 'le email est valide'
    text.style.color = 'lightgreen'
    return true
  // Si l'email ne correspond pas aux critères, message d'erreur
  } else {
      text.innerHTML = "L'email n'est pas valide"
      text.style.color = 'red'
      if (email == '') {
        text.innerHTML = ''
      }
      return false
    }}
      // ------------------ Formulaire à remplir -----------------------------------------



addEventListener('change', (event) => {
event.stopPropagation();
  let alert = () => {
    alert ("Veullez remplir ce champs")
  }
    // Appels des fonctions dans le change
    prenomValide();
    nomValide();
    adresseValide();
    villeValide();
    emailValide();
  
  }) // Fin change 

 // ------------Passage commande ---------------------------
    
 // AddEventListener pour le bouton commander

   let btn_order= document.getElementById("order")
    btn_order.addEventListener("click", (event)=> {
    event.preventDefault();
   
     // L'utilisateur est dirigé vers la page de confirmation après vérification du formulaire formulaire si un tableau de commande est bien présent
     if (villeValide() && prenomValide() && nomValide() && adresseValide() && emailValide()) {
      console.log("ok");

    } else {
      alert("Veuillez remplir correctement les champs ou ajouter des articles")
      return 
      
    } 

    //Création objet contact
    let contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address:  document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value,
    }
    

   // On cherche a envoyer deux objets : contact et le tableau de commande délcaré en début de page
   let elementsToSend = {products, contact}
    
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   
   var raw = JSON.stringify(elementsToSend);
   
   var requestOptions = {
     method: 'POST',
     headers: myHeaders,
     body: raw,
     redirect: 'follow'
   };
   
   //Récupération de la réponse sur serveur après le POST, qui contient le numéro de commande
   fetch("http://localhost:3000/api/products/order", requestOptions)
     .then(response => response.json())
     .then(result => {
       result.orderId
       console.log(result.orderId) 
       //Redirige l'utilisateur sur la page de confirmation
       window.location.href='confirmation.html'+ "?id=" + result.orderId
      

      })
     .catch(error => console.log('error', error));

    //Vidage du Local storage une fois le bouton cliqué
    localStorage.clear();
   
   //Nous redirige vers la page confirmation une fois la commande validé
   

  }) 