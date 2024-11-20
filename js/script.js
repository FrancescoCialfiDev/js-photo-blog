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
        let indirizzo = [];
        let testo = [];
        await axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
            .then(res => {
                res.data.forEach(element => {
                    indirizzo.push(element.url)
                    testo.push(element.title)
                });
                if (indirizzo.length === 6 && testo.length === 6) {
                    for (let i = 0; i < indirizzo.length; i++) {
                        containerCard.innerHTML += `<div class="card">
                    <img class="pin" src="img/pin.svg" alt="">
                        <div class="imgCard">
                            <img src="${indirizzo[i]}" alt="">
                        </div>
                        <div class="textCard">${testo[i][0].toUpperCase() + testo[i].slice(1)}</div>
                </div>`
                    }
                }

            });
    }




    createApp();
    async function createApp() {
        await generateCard();

        // ... 

        console.log(document.querySelectorAll(".card"))
    }


});