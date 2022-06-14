let params = new URLSearchParams(window.location.search);
let productId = params.get("_id");


let titleproduct = document.getElementById('title');
titleproduct.innerHTML=productId;