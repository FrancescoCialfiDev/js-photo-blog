// Dom Loader
document.addEventListener('DOMContentLoaded', function () {

    // Variables Dom Elements
    let imgDnone = document.querySelector("#overlay img");
    const overlay = document.getElementById("overlay");
    const containerCard = document.querySelector(".containerCard")

    // Variables Button Function
    const btnDelete = document.getElementById("delete")
    const btnClose = document.getElementById("close")
    const btnAdd = document.getElementById("add")

    // Random Numbers Variables
    let randomStart = Math.floor(Math.random() * 5000);

    // Variables Flags
    let activeCard = null;
    let counter = 6;
    let iter = 10;



    async function generateCard() {
        await axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${randomStart}&_limit=6`)
            .then(response => {
                response.data.forEach(element => {
                    containerCard.innerHTML += `<div id="${element.id}" class="card">
                    <img class="pin" src="img/pin.svg" alt="pin">
                        <div class="imgCard">
                            <img src="${element.url}" alt="images">
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


        imgNodelist.forEach(element => {
            element.addEventListener("click", function () {
                overlay.classList.remove("d-none"); // Remove d-none class, Show content Overlay.
                imgDnone.src = element.src; // Change source of overlay img and sets it equal to the card.
                activeCard = element; // Take The Img Target At Click
            })
        });


        // Close Overlay Button
        btnClose.addEventListener("click", function () {
            overlay.classList.add("d-none") // Add d-none class from css
        });


        // Delete Card Button
        btnDelete.addEventListener("click", function () {
            activeCard.closest(".card").remove(); // Take Parent From Bottom To Top
            overlay.classList.add("d-none")
            counter--

            if (counter === 0) {
                let intervallo = setInterval(() => {
                    containerCard.innerHTML = `<div class"d-flex centerContent"><h2>Le tue card verranno rigenerate tra ${iter--}</h2></div>`
                    if (iter < 0) {
                        clearInterval(intervallo)
                        containerCard.innerHTML = "";
                        generateCard()
                    }
                }, 500);
            }
            addClickToImg()
        });


        btnAdd.addEventListener("click", function () {
            randomStart = Math.floor(Math.random() * 5000);
            overlay.classList.add("d-none")
            axios.get(`https://jsonplaceholder.typicode.com/photos?_start=${randomStart}&_limit=1`)
                .then(res => {
                    res.data.forEach(element => {
                        containerCard.innerHTML += `<div class="card">
                <img class="pin" src="img/pin.svg" alt="pin">
                    <div class="imgCard">
                        <img src="${element.url}" alt="images">
                    </div>
                    <div class="textCard">${element.title}</div>
                </div>`
                        counter++
                        console.log(counter);
                    });
                    addClickToImg()
                });
        });

    };

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


