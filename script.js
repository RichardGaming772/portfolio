var dot = document.querySelector("#player");
var document = document.querySelector("html");
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

var dirQueue = [];
var nameCard = document.querySelector("#nameCard");
var xCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollWidth / speed) + speed);
var yCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollHeight / speed) + speed);

async function init() {
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
    xCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollWidth / speed) + speed + speed);
    yCardEnd = roundToTwo(speed * Math.ceil(nameCard.scrollHeight / speed) + speed + speed);
    nameCard.style.width = xCardEnd + "px";
    nameCard.style.height = yCardEnd + "px";
    topPos = roundToTwo(speed * Math.ceil(nameCard.offsetTop / speed) - speed - speed);
    leftPos = roundToTwo(speed * Math.ceil(nameCard.offsetLeft / speed) - speed - speed);
    xStart = leftPos;
    yStart = topPos;
    console.log(leftPos, xStart);
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
var xStart = roundToTwo(speed * Math.ceil(nameCard.offsetLeft / speed) - speed);
var yStart = roundToTwo(speed * Math.ceil(nameCard.offsetTop / speed) - speed);

init();
var gameId = setInterval(move, timeout);

window.addEventListener('resize', function () {
    clearInterval(gameId);
    gameEnded = true;
    init().then(() => {
        gameId = setInterval(move, timeout);
    });
});

document.addEventListener("keypress", switchDir);

document.addEventListener("keypress", async function (e) {
    if (gameEnded && e.code == "KeyR") {
        init().then(() => {
            gameId = setInterval(move, timeout);
        })
    }
});

function random(max) {
    return Math.floor(Math.random() * max);
}

var food = create("div", dot.parentNode, "", "food");

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}

function move() {
    var test = true;
    var downTurn = roundToTwo((speed * Math.floor(nameCard.offsetLeft / speed) + xCardEnd));
    var leftTurn = roundToTwo((speed * Math.floor(nameCard.offsetTop / speed) + yCardEnd));
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
    if (leftPos == roundToTwo(xStart - speed) && topPos == leftTurn) {
        direction = "u";
        sinceDirection = 0;
        test = false;
    }
    if (leftPos == roundToTwo(xStart - speed) && topPos == yStart) {
        direction = "r";
        sinceDirection = 0;
        test = false;
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
        var foodX = random(maxWidth / speed) * speed;
        var foodY = random(maxHeight / speed) * speed;
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
            if (topPos - speed >= - 1) {
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
    trails.forEach((t) => {
        if (
            !t.classList.contains("first") &&
            t.style.left == dot.style.left &&
            t.style.top == dot.style.top
        ) {
            clearInterval(gameId);
            gameEnded = true;
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
    if (dirQueue.length > 0 || sinceDirection == 0) {
        switch (e.code) {
            case "KeyW":
                if (dirQueue.length > 0) {
                    if (dirQueue.at(-1) != "d") {
                        dirQueue.push("u");
                    }
                } else if (direction != "d") {
                    dirQueue.push("u");
                }
                break;
            case "KeyS":
                if (dirQueue.length > 0) {
                    if (dirQueue.at(-1) != "u") {
                        dirQueue.push("d");
                    }
                } else if (direction != "u") {
                    dirQueue.push("d");
                }
                break;
            case "KeyA":
                if (dirQueue.length > 0) {
                    if (dirQueue.at(-1) != "r") {
                        dirQueue.push("l");
                    }
                } else if (direction != "r") {
                    dirQueue.push("l");
                }
                break;
            case "KeyD":
                if (dirQueue.length > 0) {
                    if (dirQueue.at(-1) != "l") {
                        dirQueue.push("r");
                    }
                } else if (direction != "l") {
                    dirQueue.push("r");
                }
                break;
            default:
                break;
        }
    } else {
        switch (e.code) {
            case "KeyW":
                if (direction != "d") {
                    direction = "u";
                    sinceDirection = 0;
                }
                break;
            case "KeyS":
                if (direction != "u") {
                    direction = "d";
                    sinceDirection = 0;
                }
                break;
            case "KeyA":
                if (direction != "r") {
                    direction = "l";
                    sinceDirection = 0;
                }
                break;
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
    if (classs) element.classList.add(classs);
    if (id) element.id = id;
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
};

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
        } else {
            temp.code = "KeyD";
        }
    } else {
        if (yDiff > 0) {
            temp.code = "KeyW";
        } else {
            temp.code = "KeyS";
        }
    }
    switchDir(temp);
    xDown = null;
    yDown = null;
};