const eContainer = document.getElementById('container');
const eSelectCategoria = document.getElementById('selectCategoria');
var bOnLoad = true;
var list = [];
var listRespaldo = [];

async  function getData2() {

    let data = [];

    await fetch(kamuiApi)
        .then(response => response.json())
        .then((res) => {
            data = res;
            console.log("RESPONSE: ", data);

            // if(res.image != '0' && res.image != 'No'){
            //     while (imgPost.firstChild) imgPost.removeChild(imgPost.firstChild);
            //     // console.log("RES: ",URL_API_GET_IMAGE+res.image);
            // let eNewImgCont = document.createElement("div");
            // let eNewImg = document.createElement("img");
            // eNewImg.src = URL_API_GET_IMAGE + data.image;
            // eNewImgCont.appendChild(eNewImg); 
            // }
            // else {
            //     while (imgPost.firstChild) imgPost.removeChild(imgPost.firstChild);
            // }

            // <!-- <img class="img-profile" src="https://picsum.photos/200/300" alt="user-img"> -->
        })
        .catch(function () {
            Swal.fire('Error al cargar la publicación.');
        });

    // while (eContainer.firstChild) eContainer.removeChild(eContainer.firstChild);
    for(let i = 0; i < data.length; i++){

        let newCard = document.createElement("div"); // 1
        let newImgCont = document.createElement("div"); // 2
        let newInfo = document.createElement("div"); // 3
        
        newCard.setAttribute("class" , "card");
        newImgCont.classList.add("imgCont");
        newInfo.classList.add("info");

        let newImg = document.createElement("img");

        newImg.setAttribute("src", kamuiApiImg + data[i].image);

        let newDivName = document.createElement("div");
        let newDivDesc = document.createElement("div");
        let newDivCategory = document.createElement("div");
        let newDivPrice = document.createElement("div");

        newDivName.classList.add("name");
        newDivDesc.classList.add("desc");
        newDivCategory.classList.add("category");
        newDivPrice.classList.add("price");

        switch(data[i].category){
            case "Snapbacks":
                newDivCategory.classList.add("category-socks");
            break;
            case "Socks":
                newDivCategory.classList.add("category-socks");
            break;

        }

        newDivName.innerHTML = data[i].name;
        newDivDesc.innerHTML = data[i].description;
        newDivCategory.innerHTML = data[i].category;
        newDivPrice.innerHTML = data[i].price + "$";

        newImgCont.appendChild(newImg);
        newInfo.appendChild(newImgCont);
        newInfo.appendChild(newDivName);
        newInfo.appendChild(newDivDesc);
        newInfo.appendChild(newDivCategory);
        newInfo.appendChild(newDivPrice);

        newCard.appendChild(newImgCont); // 2
        newCard.appendChild(newInfo); // 3

        eContainer.appendChild(newCard); // 1
    }
}

function toggleTheme() {
    var element = document.getElementById("theme");
    element.classList.toggle("dark-mode");
 }
 
async function getData() {
    // await db.collection('kamuiProducts').orderBy('votes', 'desc').get()
    await db.collection('kamuiCaps').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        list.push(doc.data());
        listRespaldo = list;
        bOnLoad = false;
        
      })
    }).catch((error) => {
        console.error("Error | refesque la pagina o avise al desarrollador: ", error);
    });
    // renderList();
    console.log(list);

    if(!bOnLoad) {
        renderProductList(list);
    }
}

function renderProductList(aLista){
    for(let i = 0; i < aLista.length; i++){

        let newCard = document.createElement("div"); // 1
        let newImgCont = document.createElement("div"); // 2
        let newInfo = document.createElement("div"); // 3
        
        newCard.setAttribute("class" , "card");
        newImgCont.classList.add("imgCont");
        newInfo.classList.add("info");

        let newImg = document.createElement("img");

        newImg.setAttribute("src", aLista[i].imgUrl);

        let newDivName = document.createElement("div");
        let newDivDesc = document.createElement("div");
        let newDivCategory = document.createElement("div");
        let newDivPrice = document.createElement("div");

        newDivName.classList.add("name");
        newDivDesc.classList.add("desc");
        newDivCategory.classList.add("category");
        newDivPrice.classList.add("price");

        switch(aLista[i].categoria){
            case "Snapbacks":
                newDivCategory.classList.add("category-snapbacks");
            break;
            case "socks":
                newDivCategory.classList.add("category-socks");
            break;

        }

        newDivName.innerHTML = aLista[i].name;
        newDivDesc.innerHTML = aLista[i].descripcion;
        newDivCategory.innerHTML = aLista[i].categoria;
        newDivPrice.innerHTML = aLista[i].precio + "$";

        newImgCont.appendChild(newImg);
        newInfo.appendChild(newImgCont);
        newInfo.appendChild(newDivName);
        newInfo.appendChild(newDivDesc);
        newInfo.appendChild(newDivCategory);
        newInfo.appendChild(newDivPrice);

        newCard.appendChild(newImgCont); // 2
        newCard.appendChild(newInfo); // 3

        eContainer.appendChild(newCard); // 1
    }
}

function filtro() {
    console.log(eSelectCategoria.value);

    if(eSelectCategoria.value == 'x'){
        console.log("SELECCIONE UNA CATEGORYA");
        return;
    }

    while (eContainer.firstChild) eContainer.removeChild(eContainer.firstChild);
    list = [];
    obtenerDatosPorFiltro(eSelectCategoria.value);
}


async function obtenerDatosPorFiltro(sCategoria) {
    await db.collection("kamuiCaps").where("categoria", "==", sCategoria).get().then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        list.push(doc.data());
        bOnLoad = false;
      })
    }).catch((error) => {
        console.error("Error | refesque la pagina o avise al desarrollador: ", error);
    });

    if(!bOnLoad) {
        renderProductList(list);
    }
}
getData();



function limpiarFiltro() {
    while (eContainer.firstChild) eContainer.removeChild(eContainer.firstChild);
    list = [];
    renderProductList(listRespaldo);
}