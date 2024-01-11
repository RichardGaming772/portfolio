<script >
import LangSelector from '../components/LangSelector.vue';
import VueCookies from 'vue-cookies'
import LangDiv from './LangDiv.vue';
export default {
    data() {
        return {
            lang: $cookies.get('lang')
        };
    },
    methods: {
        pageNav(route) {
            location.replace(route);
        }
    },
    mounted() {
        this.emitter.on("lang-switch", () => {
            this.lang = $cookies.get('lang');
        });
        document.querySelector("body").style.overscrollBehavior = "none";
        var dot = document.querySelector("#player");
        const timeout = 100;
        var topPos = 0;
        var leftPos = 0;
        var direction = "r";
        var trails = [];
        var tailLength = 5;
        var spawnFood = true;
        var gameEnded = false;
        var sinceDirection = 0;
        var maxWidth = document.querySelector("#field").clientWidth;
        var maxHeight = document.querySelector("#field").clientHeight;
        var speed = maxWidth / 100;
        var lastDirection = "r";
        var idle = true;
        var navbox = document.querySelector("#homeNav");
        var toolTip = document.querySelector("#toolTip");
        var dirQueue = [];
        var nameCard = document.querySelector("#nameCard");
        var xCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollWidth / speed) + speed);
        var yCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollHeight / speed) + speed);
        var xStart = roundToTwo(speed * Math.ceil(nameCard.offsetLeft / speed));
        var yStart = roundToTwo(speed * Math.ceil(nameCard.offsetTop / speed));
        var load = true;
        if (maxWidth == 1920) {
            var downTurn = roundToTwo((speed * Math.floor(nameCard.offsetLeft / speed) + xCardEnd));
        }
        else {
            var downTurn = roundToTwo((speed * Math.floor(nameCard.offsetLeft / speed) + xCardEnd) + speed);
        }
        var leftTurn = roundToTwo((speed * Math.floor(nameCard.offsetTop / speed) + yCardEnd));
        async function init() {
            idle = true;
            maxWidth = document.querySelector("#field").clientWidth;
            maxHeight = document.querySelector("#field").clientHeight;
            if (maxWidth <= 500)
                speed = (maxWidth / 100) * 4;
            else if (maxWidth <= 1000)
                speed = (maxWidth / 100) * 2;
            else
                speed = (maxWidth / 100);
            nameCard.style.width = "unset";
            nameCard.style.height = "unset";
            xCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollWidth / speed));
            yCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollHeight / speed));
            nameCard.style.width = xCardEnd + "px";
            nameCard.style.height = yCardEnd + "px";
            nameCard.style.top = "unset";
            nameCard.style.left = "unset";
            topPos = roundToTwo(speed * Math.ceil(nameCard.offsetTop / speed) - speed);
            leftPos = roundToTwo(speed * Math.ceil(nameCard.offsetLeft / speed) - speed);
            if (load && maxWidth == 1920) {
                downTurn = roundToTwo((speed * Math.floor(nameCard.offsetLeft / speed) + xCardEnd));
            }
            else {
                downTurn = roundToTwo((speed * Math.floor(nameCard.offsetLeft / speed) + xCardEnd) + speed);
            }
            load = false;
            leftTurn = roundToTwo((speed * Math.floor(nameCard.offsetTop / speed) + yCardEnd) + speed);
            nameCard.style.top = topPos + speed + "px";
            nameCard.style.left = leftPos + speed + "px";
            navbox.style.top = topPos + speed + nameCard.scrollHeight + speed + speed + "px";
            navbox.style.left = leftPos + speed + (nameCard.scrollWidth / 2) + "px";
            toolTip.style.top = topPos + 8 * speed + nameCard.scrollHeight + speed + speed + "px";
            toolTip.style.left = leftPos + speed + (nameCard.scrollWidth / 2) + "px";
            toolTip.style.display = "flex";
            nameCard.style.position = "absolute";
            xStart = leftPos;
            yStart = topPos;
            dot.style.width = speed + "px";
            dot.style.height = speed + "px";
            trails.forEach(trail => {
                trail.remove();
            });
            trails = [];
            dot.style.top = topPos + "px";
            dot.style.left = leftPos + "px";
            direction = "r";
            tailLength = 5;
            dirQueue = [];
            sinceDirection = 0;
            spawnFood = true;
            gameEnded = false;
            lastDirection = "r";
        }
        init();
        var gameId = setInterval(move, timeout);
        window.addEventListener('resize', function () {
            if (!gameEnded) {
                clearInterval(gameId);
                gameEnded = true;
                init().then(() => {
                    gameId = setInterval(move, timeout);
                });
            }
        });
        document.addEventListener("keydown", switchDir);
        function random(max) {
            return Math.ceil(Math.random() * max);
        }
        var food = create("div", dot.parentNode, "", "food");
        function roundToTwo(num) {
            return +(Math.round(num + "e+2") + "e-2");
        }
        function move() {
            var test = true;
            if (idle) {
                toolTip.style.display = "flex";
                if (leftPos == downTurn && topPos == yStart) {
                    direction = "d";
                    sinceDirection = 0;
                    test = false;
                }
                if (leftPos == downTurn && topPos == leftTurn) {
                    direction = "l";
                    sinceDirection = 0;
                    test = false;
                }
                if (leftPos == roundToTwo(xStart) && topPos == leftTurn) {
                    direction = "u";
                    sinceDirection = 0;
                    test = false;
                }
                if (leftPos == roundToTwo(xStart) && topPos == yStart) {
                    direction = "r";
                    sinceDirection = 0;
                    test = false;
                }
            }
            else {
                toolTip.style.display = "none";
            }
            if (dirQueue.length > 0) {
                direction = dirQueue[0];
                dirQueue.splice(0, 1);
                sinceDirection = 0;
                test = false;
            }
            if (food.style.left == dot.style.left && food.style.top == dot.style.top) {
                spawnFood = true;
                tailLength++;
            }
            var trail = create("div", dot.parentNode, "", "dotTrail");
            trail.style.left = dot.style.left;
            trail.style.width = speed + "px";
            trail.style.height = speed + "px";
            trail.style.top = dot.style.top;
            trail.countdown = tailLength;
            trails.push(trail);
            if (spawnFood) {
                spawnFood = false;
                var foodX = roundToTwo((random(maxWidth / speed, speed) * speed) - speed);
                var foodY = roundToTwo((random(maxHeight / speed, speed) * speed) - speed);
                if (foodY > (maxHeight / 2)) {
                    foodY = foodY - speed;
                }
                food.style.left = foodX + "px";
                food.style.top = foodY + "px";
                food.style.width = speed + "px";
                food.style.height = speed + "px";
            }
            switch (direction) {
                case "u":
                    if (lastDirection == "d") {
                        direction = "d";
                    }
                    break;
                case "d":
                    if (lastDirection == "u") {
                        direction = "u";
                    }
                    break;
                case "l":
                    if (lastDirection == "r") {
                        direction = "r";
                    }
                    break;
                case "r":
                    if (lastDirection == "l") {
                        direction = "l";
                    }
                    break;
                default:
                    break;
            }
            switch (direction) {
                case "u":
                    trail.style.borderTop = sinceDirection > 0 ? "solid white 1px" : "unset";
                    if (topPos - speed >= -1) {
                        topPos = +(Math.round((topPos - speed) + "e+2") + "e-2");
                    }
                    dot.style.top = topPos + "px";
                    break;
                case "d":
                    trail.style.borderTop = sinceDirection > 0 ? "solid white 1px" : "unset";
                    if (topPos + speed < maxHeight + 1) {
                        topPos = +(Math.round((topPos + speed) + "e+2") + "e-2");
                    }
                    dot.style.top = topPos + "px";
                    break;
                case "l":
                    trail.style.borderLeft = sinceDirection > 0 ? "solid white 1px" : "unset";
                    if (leftPos - speed >= -1) {
                        leftPos = +(Math.round((leftPos - speed) + "e+2") + "e-2");
                    }
                    dot.style.left = leftPos + "px";
                    break;
                case "r":
                    trail.style.borderLeft = sinceDirection > 0 ? "solid white 1px" : "unset";
                    if (leftPos + speed < maxWidth - 1) {
                        leftPos = +(Math.round((leftPos + speed) + "e+2") + "e-2");
                    }
                    dot.style.left = leftPos + "px";
                    break;
                default:
                    break;
            }
            trails.forEach(async (t) => {
                if (!t.classList.contains("first") &&
                    t.style.left == dot.style.left &&
                    t.style.top == dot.style.top) {
                    clearInterval(gameId);
                    gameEnded = true;
                    await sleep(1000);
                    init().then(() => {
                        gameId = setInterval(move, timeout);
                    });
                }
                if (t.countdown <= 0) {
                    trails.splice(trails.indexOf(t), 1);
                    t.remove();
                }
                if (!spawnFood) {
                    t.countdown--;
                    t.classList.remove("first");
                }
            });
            if (test) {
                sinceDirection++;
            }
            lastDirection = direction;
        }
        function switchDir(e) {
            idle = false;
            if (dirQueue.length > 0 || sinceDirection == 0) {
                switch (e.code) {
                    case "ArrowUp":
                    case "KeyW":
                        dirQueue.push("u");
                        break;
                    case "ArrowDown":
                    case "KeyS":
                        dirQueue.push("d");
                        break;
                    case "ArrowLeft":
                    case "KeyA":
                        dirQueue.push("l");
                        break;
                    case "ArrowRight":
                    case "KeyD":
                        dirQueue.push("r");
                        break;
                    default:
                        break;
                }
            } else {
                switch (e.code) {
                    case "ArrowUp":
                    case "KeyW":
                        if (direction != "d") {
                            direction = "u";
                            sinceDirection = 0;
                        }
                        break;
                    case "ArrowDown":
                    case "KeyS":
                        if (direction != "u") {
                            direction = "d";
                            sinceDirection = 0;
                        }
                        break;
                    case "ArrowLeft":
                    case "KeyA":
                        if (direction != "r") {
                            direction = "l";
                            sinceDirection = 0;
                        }
                        break;
                    case "ArrowRight":
                    case "KeyD":
                        if (direction != "l") {
                            direction = "r";
                            sinceDirection = 0;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        function create(tag, parent, text, classs = null, id = null) {
            let element = document.createElement(tag);
            element.appendChild(document.createTextNode(text));
            parent.appendChild(element);
            if (classs)
                element.classList.add(classs);
            if (id)
                element.id = id;
            return element;
        }
        // Swipe Controls
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        var xDown = null;
        var yDown = null;
        function getTouches(e) {
            return e.touches ||
                e.originalEvent.touches;
        }
        function handleTouchStart(e) {
            const firstTouch = getTouches(e)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        }
        ;
        function handleTouchMove(e) {
            if (!xDown || !yDown) {
                return;
            }
            var xUp = e.touches[0].clientX;
            var yUp = e.touches[0].clientY;
            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;
            var temp = { code: "" };
            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    temp.code = "KeyA";
                }
                else {
                    temp.code = "KeyD";
                }
            }
            else {
                if (yDiff > 0) {
                    temp.code = "KeyW";
                }
                else {
                    temp.code = "KeyS";
                }
            }
            switchDir(temp);
            xDown = null;
            yDown = null;
        }
        ;
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
    components: { LangDiv }
}
</script>

<template>
    <div id="field">
        <div class="dot" id="player" style="left:0px;top:0px;"></div>
    </div>
    <div id="toolTip">
        <div></div>
        <p v-if="lang == 'fr'">OU</p>
        <p v-else-if="lang == 'eng'">OR</p>
        <img src="https://cdn-icons-png.flaticon.com/512/4603/4603506.png" width="50px">
    </div>
    <main>
        <h2 id="nameCard">Killian K/vella</h2>
    </main>
    <nav id="homeNav">
        <LangDiv @click="pageNav('about')" divClassString="navItem" frTxt="A propos" engTxt="About" />
        <LangDiv @click="pageNav('projects')" divClassString="navItem" frTxt="Projets" engTxt="Projects" />
        <div @click="pageNav('contact')" class="navItem">Contact</div>
    </nav>
</template>

<style scoped>
html,
body {
  overscroll-behavior: none;
}
</style>
