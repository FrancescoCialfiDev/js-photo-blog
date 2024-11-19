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

let containerCard = document.querySelector(".containerCard")
console.log(containerCard);
let accumulo = [];
axios.get("https://jsonplaceholder.typicode.com/photos?_limit=6")
    .then(res => {
        res.data.forEach(element => {
            accumulo.push(element.url)
        });
        if (accumulo.length === 6) {
            for (let i = 0; i < accumulo.length; i++) {
                containerCard.innerHTML += `<div class="card">
                <img src="img/pin.svg" alt="">
                    <div class="imgCard">
                        <img src="${accumulo[i]}" alt="">
                    </div>
                    <div class="textCard">Lorem ipsum</div>
            </div>`
            }

        }
    })
