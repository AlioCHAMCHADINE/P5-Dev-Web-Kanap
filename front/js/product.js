

      let params = window.location.href;
      let url = new URL(params);
      let id = url.searchParams.get("_id");
      

      // const params = new URLSearchParams(document.location.search); 
      // const id = params.get("_id");
      
const main =document.querySelector("main");


      fetch (`http://localhost:3000/api/products/${id}`)
  .then((res) => res.json())
  .then((couch) => {
    console.table(couch)
    const template = document.querySelector("#article-product");

    let chercherProduits = () => {
      return couch
  }
  let trouverProduits = chercherProduits()
    console.table(couch.colors);
    // couch.colors tableau contenant les couleurs de canapé

          const clone = document.importNode(template.content,true);
          const baliseTitre = clone.querySelector("#title");
          const balisePrix = clone.querySelector("#price");
          const baliseDescription = clone.querySelector("#description");
          let baliseCouleur = clone.querySelector("#colors");
          const baliseImage = clone.querySelector(".item__img");

  //affectation des valeurs du canapé aux éléments du template :
          baliseTitre.innerHTML = couch.name;
          balisePrix.innerHTML = couch.price;
          baliseDescription.textContent = couch.description;
          baliseCouleur.textContent = couch.colors;
          baliseImage.innerHTML =`<img src="${couch.imageUrl}" alt="${couch.altTxt}">`;
          
          
          for(let index=0; index<couch.colors.length; index++){
            baliseCouleur.innerHTML +=`<option value="${index}">${couch.colors[index]}</option>`
          }

          main.appendChild(clone);
          
          let quantite = document.getElementById("quantity")
        
          
          



          // addEvent listener pour Ajouter au panier
              
          let Panier = document.getElementById("addToCart");
          Panier.addEventListener("click", ()=> {
           
          //Conversion de la chaîne de caractère :
          let quantiteProduit = parseInt(quantite.value);
          let prixProduit = quantiteProduit * trouverProduits.price
          

          // local Storage

          //Ajout de produit au local storage:

          const ajoutProduitLocalStorage = () => {
            produitLocal.push(choixProduits);
              
            // recupération dans le localStorage  
            //on transforme en format JSON pour envoyer dans la key "produit" dans le localStorage:
            localStorage.setItem ("produit", JSON.stringify(produitLocal));
          }
          // Fonction pop up lorsque le client ajoute un article:
         
         const popupConfirmation = ()  => {
         
         if(window.confirm(`Le(s) produit(s) "${trouverProduits.name}" ont été ajoutés au panier, pour consulter le panier cliquer sur OK, Pour Consulter les autres articles cliquer sur ANNULER`)){
           window.location.href ="cart.html";
         }
         else {
           window.location.href ="index.html"    
         }
         }

         // variable qui permet de récuperer les données dans le formulaire :
        
let choixProduits = {
  name: trouverProduits.name,
  _id: trouverProduits.idProduit,
  quantity: quantiteProduit,
  colors: colors.value,
  image: trouverProduits.imageUrl,
  altImage: trouverProduits.altTxt,
  price: prixProduit,
}

         
         let produitLocal = JSON.parse(localStorage.getItem("produit"));
         
         if (choixProduits.quantity == "" || choixProduits.colors == "" || choixProduits.quantity > 100) {
         alert ("Veuillez selectionner une couleur et/ou un nombre d'article")
         } else {
         //S'il y a déjà des produits enregistré dans le localStorage
         if(produitLocal){
             
         let produitExistCarte = false
                 for (let a in produitLocal) {
                 //Si le produit selectionné a une couleur ET un id identique
                 if ((choixProduits.colors == produitLocal[a].colors) && (choixProduits._id == produitLocal[a]._id)) {
                     produitExistCarte = true
                     
                     //On additione la quantité du produit choisit avec la quantité du produit récupéré au localStorage
                     
                     produitLocal[a].quantity += parseInt(choixProduits.quantity);
                     produitLocal[a].price += choixProduits.price;
                     //Renvoi au localStorage
                     localStorage.setItem ("produit", JSON.stringify(produitLocal));
                     console.log("Addition")
                     ;
                 }
                 
             } 
                 
          if (!produitExistCarte){
             ajoutProduitLocalStorage();
          }       
         
         console.log("ok");
         popupConfirmation();
         } else {
         //S'il  ya pas de produit enregistré dans le localStorage
         produitLocal = [];
         ajoutProduitLocalStorage();
         console.log(produitLocal);
         popupConfirmation();
         
             }}
         }) 

     });
  

