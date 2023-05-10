let canvas = document.querySelector("#screen");
let ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let isDrawing = false;
let colors = document.querySelector("#colors").value;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    draw(event);
}

function stopDrawing(event) {
    isDrawing = false;
    ctx.beginPath();
    canvas.removeEventListener('mousemove', continueDrawing);
}

function draw(event) {
    if (!isDrawing) return;

    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top + window.scrollY;
    colors = document.querySelector("#colors").value;

    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.strokeStyle = colors;
    ctx.moveTo(x, y);

    canvas.addEventListener('mousemove', continueDrawing);
}

function continueDrawing(event) {
    if (!isDrawing) return; // Exit if not currently drawing

    const x = event.clientX - canvas.getBoundingClientRect().left;
    const y = event.clientY - canvas.getBoundingClientRect().top + window.scrollY;

    ctx.lineTo(x, y);
    ctx.stroke();
}

// Clear button event listener
let clearButton = document.querySelector("#clearButton");
clearButton.addEventListener("click", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Color select event listener
let colorSelect = document.querySelector("#colors");
colorSelect.addEventListener("change", function () {
    colors = colorSelect.value;
});