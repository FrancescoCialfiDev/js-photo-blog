// Dom Loader
document.addEventListener('DOMContentLoaded', function () {

    // Variabili Dom Elements
    const overlay = document.getElementById("overlay");
    const containerCard = document.querySelector(".containerCard")

    // Variabili Button Function
    const btnElimina = document.getElementById("elimina")
    const btnchiudi = document.getElementById("chiudi")




    async function generateCard() {
        await axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
            .then(res => {
                res.data.forEach(element => {
                    containerCard.innerHTML += `<div id="${element.id}" class="card">
                    <img class="pin" src="img/pin.svg" alt="">
                        <div class="imgCard">
                            <img src="${element.url}" alt="">
                        </div>
                        <div class="textCard">${element.title}</div>
                </div>`
                });
            });
    };


    createApp();
    async function createApp() {
        await generateCard();
        const imgNodelist = document.querySelectorAll(".card .imgCard img")
        console.log(imgNodelist) // NodeList Immagini con Indice
        const cardNodelist = document.querySelectorAll(".card img:last-child")
        console.log(cardNodelist); // Contieni ID Card



        imgNodelist.forEach(element => {
            element.addEventListener("click", function () {
                overlay.classList.remove("d-none"); // Remove d-none class, Show content Overlay.
                let imgDnone = document.querySelector("#overlay img");
                imgDnone.src = element.src; // Change source of overlay img and sets it equal to the card.

            })
        });

        btnchiudi.addEventListener("click", function () {
            overlay.classList.add("d-none")
        });

        btnElimina.addEventListener("click", function () {
            overlay.classList.add("d-none")

        });

    };










});