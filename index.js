
const kamuiApi = "https://kamuistore.herokuapp.com/kamuiproducts";
var kamuiApiImg = "https://kamuistore.herokuapp.com/";


const eContainer = document.getElementById('container');
// const frase = document.getElementById('comment');
// const contentImg = document.getElementById('content-img');
// const postCategory = document.getElementById('postCategory');
// const postSubmit = document.getElementById("postSubmit");
// const timeDate = document.getElementById("time-date");

// var deleteCategory;
// const imgPost = document.getElementById('cImg');

async  function getData() {

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

        console.log("data[i].image;: ",data[i].image);


    }
}

// const thisForm = document.getElementById('myForm');
// thisForm.addEventListener('submit', async function (e) {

//     // postSubmit.classList.add("btn-blocked");
//     // postSubmit.disabled = true;

//     e.preventDefault();

//     let name = document.getElementById('name').value;
//     let description = document.getElementById('description').value;
//     description.slice(-1) == "." ? null :  description += ".";
//     let category = document.getElementById('category').value;
//     let fileInput = document.querySelector('#image');

//     var formdata = new FormData();
//     formdata.append("name", capitalizeFirstLetter(name));
//     formdata.append("description", description);
//     formdata.append("category", category);
//     // formdata.append("image", fileInput.files[0], fileInput.value);

//     var requestOptions = {
//         method: 'POST',
//         body: formdata,
//         redirect: 'follow'
//     };

//     await fetch(URL_API_CREATE_NEW_POST, requestOptions).then((response) =>{
//         // console.log("RESPONSE: ", response);
//         // const result = response.json();

//         document.getElementById('name').value = '';
//         document.getElementById('description').value = '';
//         document.getElementById('category').value = '';

//         postSubmit.classList.remove("btn-blocked");
//         postSubmit.disabled = false;
//         Swal.fire("Publicacion con Exito!");
//     })
//     .catch((error) =>{
//         console.log(error);
//         // document.getElementById('name').value = '';
//         // document.getElementById('description').value = '';
//         // document.getElementById('category').value = '';
//         Swal.fire('Error al Publicar..');

//     });
    
// });

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function toggleTheme() {
    var element = document.getElementById("theme");
    element.classList.toggle("dark-mode");
 }

getData();