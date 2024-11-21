// Dom Loader
document.addEventListener('DOMContentLoaded', function () {

    // Variabili Dom Elements
    const overlay = document.getElementById("overlay");
    const containerCard = document.querySelector(".containerCard")

    // Variabili Button Function
    const btnDelete = document.getElementById("delete")
    const btnClose = document.getElementById("close")
    const btnAdd = document.getElementById("add")
    let randomStart = Math.floor(Math.random() * 5000);
    let activeCard = null;
    let counter = 6;
    let iter = 10;



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

        btnClose.addEventListener("click", function () {
            overlay.classList.add("d-none")
        });



        btnDelete.addEventListener("click", function () {
            activeCard.closest(".card").remove();
            overlay.classList.add("d-none")
            counter--
            if (counter === 0) {
                let intervallo = setInterval(() => {
                    containerCard.innerHTML = `<div class"d-flex centerContent"><h2>Le tue card verranno generate tra ${iter--}</h2></div>`
                    if (iter < 0) {
                        clearInterval(intervallo)
                        containerCard.innerHTML = "";
                        generateCard()
                    }
                }, 1000);
            }

        });


        btnAdd.addEventListener("click", function () {
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
                        counter++
                        console.log(counter);
                    });

                    addClickToImg()
                    function addClickToImg() {
                        const imgNodelist = document.querySelectorAll(".card .imgCard img");
                        imgNodelist.forEach(element => {
                            element.addEventListener("click", function () {
                                overlay.classList.remove("d-none");
                                let imgDnone = document.querySelector("#overlay img");
                                imgDnone.src = element.src;
                                activeCard = element;
                            });
                        });

                    }

                });
        });

    };



});


