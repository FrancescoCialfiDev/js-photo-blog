// Dom Loader
document.addEventListener('DOMContentLoaded', function () {

    // Variabili Dom Elements
    const overlay = document.getElementById("overlay");
    const containerCard = document.querySelector(".containerCard")

    // Variabili Button Function
    const btnElimina = document.getElementById("elimina")
    const btnChiudi = document.getElementById("chiudi")
    const btnAggiungi = document.getElementById("aggiungi")
    let randomStart = Math.floor(Math.random() * 5000);
    let activeCard = null;


    let baseURL = "https://jsonplaceholder.typicode.com";
    let endPoint = "/photos?"
    let param = "_limit=6"
    const url = `${baseURL}${endPoint}${param}`;


    async function generateCard() {
        await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${randomStart}&_limit=6`)
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
        console.log(imgNodelist) // NodeList Immagini with card Index 
        const cardNodelist = document.querySelectorAll(".card")
        console.log(cardNodelist); // Contain ID Card 





        imgNodelist.forEach(element => {
            element.addEventListener("click", function () {
                overlay.classList.remove("d-none"); // Remove d-none class, Show content Overlay.
                let imgDnone = document.querySelector("#overlay img");
                imgDnone.src = element.src; // Change source of overlay img and sets it equal to the card.
                activeCard = element;
            })
        });

        btnChiudi.addEventListener("click", function () {
            overlay.classList.add("d-none")
        });

        btnElimina.addEventListener("click", function () {
            activeCard.closest(".card").remove();
            overlay.classList.add("d-none")

        });


        btnAggiungi.addEventListener("click", function () {
            let randomStart = Math.floor(Math.random() * 5000);
            overlay.classList.add("d-none")
            axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${randomStart}&_limit=1`)
                .then(res => {
                    res.data.forEach(element => {
                        containerCard.innerHTML += `<div class="card">
                <img class="pin" src="img/pin.svg" alt="">
                    <div class="imgCard">
                        <img src="${element.url}" alt="">
                    </div>
                    <div class="textCard">${element.title}</div>
            </div>`
                    });


                    const imgNodelist = document.querySelectorAll(".card .imgCard img");
                    imgNodelist.forEach(element => {
                        element.addEventListener("click", function () {
                            overlay.classList.remove("d-none");
                            let imgDnone = document.querySelector("#overlay img");
                            imgDnone.src = element.src;
                            activeCard = element;
                        });
                    });

                });
        });


    };



});