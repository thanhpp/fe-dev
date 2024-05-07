// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const counterParagraph = document.querySelector("p");
let count = 25;


// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
    return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {
    constructor(x, y, velX, velY) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
    }
}

// Ball
class Ball extends Shape {
    constructor(x, y, velX, velY, color, size) {
        super(x, y, velX, velY);
        this.color = color;
        this.size = size;
        this.exist = true;
    }

    draw() {
        if (!this.exist) {
            return;
        }
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    update() {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX)
        }

        if ((this.x - this.size) <= 0) {
            this.velX = - (this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY)
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (this === ball) {
                continue
            }
            if (!ball.exist) {
                continue
            }

            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
                ball.color = this.color = randomRGB();
            }
        }
    }
}

class EvilCircle extends Shape {
    constructor(x, y) {
        super(x, y, 20, 20);
        this.color = "white";
        this.size = 10;

        window.addEventListener("keydown", (e) => {
            switch (e.key) {
                case "a":
                    this.x -= this.velX;
                    break;
                case "d":
                    this.x += this.velX;
                    break;
                case "w":
                    this.y -= this.velY;
                    break;
                case "s":
                    this.y += this.velY;
                    break;
            }
        })

        console.log("evil created", this);
    }

    draw() {
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x = -(this.size)
        }

        if ((this.x - this.size) <= 0) {
            this.x = +(this.size);
        }

        if ((this.y + this.size) >= height) {
            this.y = -(this.size);
        }

        if ((this.y - this.size) <= 0) {
            this.y = +(this.size);
        }
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!ball.exist) {
                continue
            }

            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
                ball.exist = false;
                count -= 1;
                counterParagraph.textContent = `Ball count: ${count}`;
            }
        }
    }
}

// const testBall = new Ball(50, 100, 4, 4, "blue", 10);
// testBall.x;
// testBall.size;
// testBall.color;
// testBall.draw();

const balls = [];
const evil = new EvilCircle(random(0 + 10, width - 10), random(0 + 10, height - 10));

while (balls.length < count) {
    const size = random(10, 20);
    const ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        randomRGB(),
        size,
    );

    balls.push(ball);
}
counterParagraph.textContent = `Ball count: ${count}`;

function loop() {
    ctx.fillStyle = "rgb(0 0 0 / 25%)";
    ctx.fillRect(0, 0, width, height);

    for (const ball of balls) {
        ball.draw();
        ball.update();
        ball.collisionDetect();
        evil.draw();
        evil.checkBounds();
        evil.collisionDetect();
    }

    requestAnimationFrame(loop)
}


loop();