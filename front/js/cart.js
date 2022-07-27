// Affichage des produits dans le panier:

// Récupéreration des produits du localStorage

console.log(window.location);
const params = window.location.href;
console.log(params);

const url = new URL(params);
console.log(url);
const id = url.searchParams.get("_id");


let products = JSON.parse(localStorage.getItem("produit"));
// console.table(products);
let couch = document.getElementById("cart__items");
couch.innerHTML="";
for (let i = 0; i < products.length; i++) {
    const product = products[i];
  
      console.table(product);

//Requête API pour le JSON des produits à afficher les infos de chaque produits ajoutés
// fetch(`http://localhost:3000/api/products/`)
//   .then((res) => {
//   return res.json();
//   })
//   .then((products) => {
//     console.table(products)
//   })


      

    // Si le panier est vide : Afficher le panier est vide
    
    if(products === null || products == 0 ) {
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
        
        for (i = 0; i < products.length; i++) {
            console.log("Nombre d'article " +  products.length);

             //Calcul du prix , quantité * nombre de produit
        let quantityProduct = parseInt(products[i].quantity);
        let calculPrixProduit = products[i].price;
        

        structureProduitPanier = structureProduitPanier + `
        <article class="cart__item" data-id="${products[i]._id}" data-color="${products[i].colors}">
                <div class="cart__item__img">
    <img src= "${product.image}" alt="${product.altImage}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.colors}</p>
      <p>${product.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value= ${product.quantity}>
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
        }

if(i = products.length){
        
  //injection html dans la page panier
couch.innerHTML= structureProduitPanier;
}
    }
  }
// Création des fonctions qui permettent de modifier la quantité et supprimer les produits du panier

 //Sélection des éléments dans le DOM pour afficher la quantité/prix total
 let total = () => {
  let totalQuantite = document.getElementById("totalQuantity");
  let totalPrix = document.getElementById("totalPrice")
  // let couch = document.getElementById("price")
  let sommeQuantite = 0;
  let sommePrix = 0;
  //Sélection des blocs contenant le prix des articles de la liste

  
  for (let p in products) {
    
    let price = products[p].price;
    let objectTotal = parseInt(products[p].quantity);
    
    sommeQuantite  += objectTotal;
    sommePrix += price;
    console.table("Addition")
    console.table(sommePrix)
  }
  
  totalPrix.innerHTML= sommePrix
  totalQuantite.innerHTML = sommeQuantite
}
total();
//Gestion des boutons pour modifier la quantités


let modifyQuantity = document.querySelectorAll(".itemQuantity"); 
    console.log(modifyQuantity);
    
     addEventListener("change", ()=> {

      changeQuantity();
    
      total()
    })
        
    function changeQuantity() {
    
      for (let c in products) {
        //Renvoi 100 si l'utilisateur tente de dépasser 100 articles
          if (modifyQuantity[c].value > 100) {
            modifyQuantity[c].value = 100
          } 
          //Renvoi 1 si l'utilisateur sélectionne 0 articles
          if (modifyQuantity[c].value == 0) {
            modifyQuantity[c].value = 1
          } 
          if (modifyQuantity[c].value < 0) {
            modifyQuantity[c].value = 1
          }
          else {
            products[c].quantity = parseInt(modifyQuantity[c].value);
            products[c].price = products[c].quantity *products[c].price;
            
          }
          
          localStorage.setItem ("produit", JSON.stringify(products));}
        }



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
                  };
                  
        
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
         
         //redirection vers la page de confirmation une fois la commande validé
         

      
        });        