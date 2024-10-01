let left_motor = document.getElementById("left-motor");
let right_motor = document.getElementById("right-motor");

let controller = document.getElementById("controller");
let socket = document.getElementById("socket");

let down = false;
let controller_x = 0;
let controller_y = 0;

let key_w = false;
let key_a = false;
let key_s = false;
let key_d = false;

document.addEventListener("mouseup", function() {
    down = false;
    handleControls();
});
document.addEventListener("mousemove", function(e) {
    controller_x = e.pageX - socket.offsetLeft - 25;
    controller_y = e.pageY - socket.offsetTop - 25;
    handleControls();
});
document.addEventListener("keyup", function(e) {
    switch(e.key) {
        case "w":
            key_w = false;
            break;
        case "a":
            key_a = false;
            break;
        case "s":
            key_s = false;
            break;
        case "d":
            key_d = false;
            break;
    }
    handleControls();
});
document.addEventListener("keydown", function(e) {
    switch(e.key) {
        case "w":
            key_w = true;
            break;
        case "a":
            key_a = true;
            break;
        case "s":
            key_s = true;
            break;
        case "d":
            key_d = true;
            break;
    }
    handleControls();
});
controller.addEventListener("mousedown", function(e) {
    down = true;
    handleControls();
});

function handleControls() {
    let x = 0;
    let y = 0;
    if(!down) {
        controller_x = 0;
        controller_y = 0;
    } else {
        x = controller_x / 50;
        y = controller_y / -50;
        let mag = Math.sqrt(x*x + y*y);
        x /= mag;
        y /= mag;
        mag = Math.max(-1, Math.min(1, mag));
        x *= mag;
        y *= -1 * mag;
    };

    setStickPosition(x * 50, y * 50);

    let { left, right } = controls(key_w, key_a, key_s, key_d, x, y);

    setMotors(left, right);
}

function setStickPosition(x, y) {
    controller.style.left = `${x}%`;
    controller.style.top = `${y}%`;
}

function setMotors(left, right) {
    left = 100 - ((left + 1) / 2 * 100);
    right = 100 - ((right + 1) / 2 * 100);
    left_motor.style.height = `${left}%`;
    right_motor.style.height = `${right}%`;
}
