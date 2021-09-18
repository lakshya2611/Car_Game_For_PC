const score = document.querySelector(".score");
const popup = document.querySelector(".popup");
const mainCar = document.querySelector(".mainCar");
const road = document.querySelector(".road");

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);
popup.addEventListener("click", startGame);

keyPair = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

let player = { speed: 5 , score:0 };

function isCollide(a, b) {
    mainRect = a.getBoundingClientRect();
    enemyRect = b.getBoundingClientRect();

    return !((mainRect.bottom < enemyRect.top) || 
    (mainRect.top > enemyRect.bottom) || 
    (mainRect.right < enemyRect.left) || 
    (mainRect.left > enemyRect.right));
}

function play() {
    // console.log("Game Started");
    let car = document.querySelector(".mainCar");
    const rodm = road.getBoundingClientRect();
    if (player.start) {
        movelines();
        movecars(car);
        if (keyPair.ArrowDown && player.y < (rodm.bottom - 130)) {
            player.y += player.speed;
        }
        if (keyPair.ArrowUp && player.y > rodm.top + 50) {
            player.y -= player.speed;
        }
        if (keyPair.ArrowLeft && player.x > (rodm.left + 10)) {
            player.x -= player.speed;
        }
        if (keyPair.ArrowRight && player.x < (rodm.right - 60)) {
            player.x += player.speed;
        }

        car.style.left = player.x + "px";
        car.style.top = player.y + "px";

        window.requestAnimationFrame(play);
        score.innerHTML = `Your score :- ${player.score++}`;
    }
}

function movelines() {
    const lines = document.querySelectorAll(".steps");
    lines.forEach(function (item) {

        if (item.y >= 650) {
            item.y -= 600;
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function endGame(){
    player.start = false;
    popup.classList.remove("hide");
    popup.innerHTML = `Game Over <br> You got crashed by a car<br> Press here to play again <br> your score - ${player.score}`;
    road.innerHTML = "";
}

function movecars(car) {
    const cars = document.querySelectorAll(".enemyCar");
    cars.forEach(function (item) {

        if(isCollide(car,item)){
            endGame();
        }

        if (item.y >= 650) {
            item.y -= 600;
            item.style.left = (Math.floor(Math.random() * 250) + 540) + "px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    })
}

function startGame() {
    popup.classList.add("hide");

    const car = document.createElement("div");
    car.setAttribute("class", "mainCar");
    road.appendChild(car);

    for (i = 0; i < 5; i++) {
        const roadstrips = document.createElement("div");
        roadstrips.setAttribute("class", "steps");
        roadstrips.y = (i * 150);
        roadstrips.style.top = roadstrips.y + "px";
        road.appendChild(roadstrips);
    }

    for (i = 0; i < 3; i++) {
        const ememcar = document.createElement("div");
        ememcar.setAttribute("class", "enemyCar");
        ememcar.y = (i * 200);
        ememcar.style.top = ememcar.y + "px";
        ememcar.style.left = (Math.floor(Math.random() * 250) + 540) + "px";
        road.appendChild(ememcar);
}

    player.y = car.offsetTop;
    player.x = car.offsetLeft;
    player.start = true;
    player.score = 0;
    window.requestAnimationFrame(play);

}

function keyDown(e) {
    e.preventDefault();
    keyPair[e.key] = true;
}

function keyUp(e) {
    e.preventDefault();
    keyPair[e.key] = false;
}