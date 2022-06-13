// Récupération de l'api:

fetch("http://localhost:3000/api/products")

  // le résultat en json:
  .then((response) => response.json())
  .then((objetProduits) => {

    // information en console sous forme tableau:
    console.table(objetProduits);

    // la fonction affichage des produits
    lesKanaps(objetProduits);
  })
// s'il ya d'erreur remplace le titre h1 par erreur 404
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

  // fonction d'affichage des produits de l'api
  function lesKanaps(index) {
    // déclaration de variable 
    let zoneArticle = document.querySelector("#items");
    // déclaration de boucle 
  for (let article of index) {
    // ajout des articles
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
    <img src="${article.imageUrl}" alt="${article.altTxt}">
    <h3 class="productName">${article.name}</h3>
    <p class="productDescription">${article.description}</p>
  </article>
  </a>`;
}
}
