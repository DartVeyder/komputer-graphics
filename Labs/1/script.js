const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Розмір псевдопікселя
const pixelSize = 20;

// Розмір області виводу
const canvasWidth = canvas.width - pixelSize;
const canvasHeight = canvas.height;

// Визначення довжини сторін трикутника
const sideLength = Math.min(canvasWidth, canvasHeight);
// Визначення координат вершин трикутника
const topX = canvasWidth / 2;
const topY = (canvasHeight - sideLength * Math.sqrt(3) / 2) / 2;
const bottomLeftX = (canvasWidth - sideLength) / 2;
const bottomLeftY = topY + sideLength * Math.sqrt(3) / 2;
const bottomRightX = (canvasWidth + sideLength) / 2;
const bottomRightY = topY + sideLength * Math.sqrt(3) / 2;
// Функція для малювання лінії за алгоритмом несиметричного ЦДА
function drawLineCDA(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const steps = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy);
    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = x1;
    let y = y1;

    for (let i = 0; i <= steps; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(Math.round(x), Math.round(y), pixelSize, pixelSize);
        x += xIncrement;
        y += yIncrement;
    }
}

// Функція для малювання лінії за алгоритмом Брезенхема
function drawLineBresenham(x1, y1, x2, y2) {
    y1 = Math.round(y1)
    y2 = Math.round(y2)
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        ctx.fillStyle = "red";
        ctx.fillRect(x1, y1, pixelSize, pixelSize);

        if (x1 === x2 && y1 === y2) {
            break;
        }

        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }

    }
}


// Малюємо бічні сторони трикутника червоними лініями (алгоритм Брезенхема)
drawLineBresenham(bottomLeftX, bottomLeftY, topX, topY);
drawLineBresenham(topX, topY, bottomRightX, bottomRightY);

// Малюємо основу трикутника зеленою лінією (алгоритм несиметричного ЦДА)
drawLineCDA(bottomRightX, bottomRightY, bottomLeftX, bottomLeftY);