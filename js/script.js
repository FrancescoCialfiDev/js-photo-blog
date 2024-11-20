/**
 * 
 * 
 * 
 * 
 * <div class="card">
<img src="img/pin.svg" alt="">
<div class="imgCard">
    <img src="img/cork.png" alt="">
</div>
<div class="textCard">Lorem ipsum</div>
</div>
 * 
 * 
 * 
 * 
 *
 */
document.addEventListener('DOMContentLoaded', function () {
    // DOM caricato, inizio manipolazione


    let containerCard = document.querySelector(".containerCard")
    console.log(containerCard);


    async function generateCard() {
        await axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
            .then(res => {
                res.data.forEach(element => {
                    containerCard.innerHTML += `<div class="card">
                    <img id="${element.id}" class="pin" src="img/pin.svg" alt="">
                        <div class="imgCard">
                            <img src="${element.url}" alt="">
                        </div>
                        <div class="textCard">${element.title[0].toUpperCase() + element.title.slice(1)}</div>
                </div>`
                });

            });
    }

    createApp();
    async function createApp() {
        await generateCard();
        let nodeList = document.querySelectorAll(".card .imgCard img");
        nodeList.forEach(element => {
            element.addEventListener("click", function () {
                let overlay = document.getElementById("overlay");
                overlay.classList.remove("d-none");
                let imgDnone = document.querySelector("#overlay img")
                imgDnone.src = element.src

            })
        });
    };


});