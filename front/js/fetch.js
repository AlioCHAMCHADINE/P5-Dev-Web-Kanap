async function getProductById(idProduit) {

    return (
     fetch (`http://localhost:3000/api/products/${idProduit}`)
           .then((res) => res.json())
           .then((couch) => {
               console.log(couch.price);
               return couch.price
           })
           .catch((couch) => {
               return error;
                
           })
   );
   
}
for(let i=0; i<idTab.length;i++){
    console.log(idTab[i])
    let prix=getProductById(idTab[i])
    console.log(prix)
}