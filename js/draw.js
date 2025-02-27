const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
canvas.width = 1920;
canvas.height = 1080;

const ZOOM_SIZE = 0.06;

let posX = 0;
let posY = 0;
let size = 1;

let mouseX = 0;
let mouseY = 0;
let scrollStartX = 0;
let scrollStartY = 0;
let scrolling = false;

const indices_sprite = new Image();
indices_sprite.src = './data/countries_indices.png';

indices_sprite.onload = ((e) => {
    draw();
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const ratio = canvas.width / indices_sprite.width;
    ctx.drawImage(indices_sprite, posX, posY, indices_sprite.width * size * ratio, indices_sprite.height * size * ratio);
}

canvas.addEventListener('mousemove', (e) => {
    const boundingRect = canvas.getBoundingClientRect();
    const ratio = 1920 / boundingRect.width;
    mouseX = (e.x - boundingRect.x) * ratio;
    mouseY = (e.y - boundingRect.y) * ratio;
    if (scrolling) {
        posX = mouseX - scrollStartX;
        posY = mouseY - scrollStartY;
        draw();
    }
});

canvas.addEventListener('mousedown', (e) => {
    scrollStartX = mouseX - posX;
    scrollStartY = mouseY - posY;
    scrolling = true;
});

canvas.addEventListener('mouseup', (e) => {
    scrolling = false;
});

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    const _zoomSize = ZOOM_SIZE * size
    const dir = -e.deltaY / 100;
    const x = (mouseX - posX) / size;
    const y = (mouseY - posY) / size;
    posX -= _zoomSize * dir * x;
    posY -= _zoomSize * dir * y;
    size += dir * _zoomSize;
    draw();
});