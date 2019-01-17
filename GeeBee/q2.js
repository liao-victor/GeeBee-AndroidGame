var canvas = document.getElementById("myCanvas");
canvas.width  = window.innerWidth;
canvas.height = canvas.width*1.1;

var ctx = canvas.getContext("2d");
var ballRadius = 4;
var x = canvas.width/2;
var y = canvas.height*0.80;
var dx = 3;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 50;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 10;
var brickColumnCount = 3;
var brickWidth = (canvas.width*0.7-70)/brickRowCount;
var brickHeight = canvas.width*0.029;
var brickPadding = 5;
var brickOffsetTop = 10+brickHeight;
var brickOffsetLeft = canvas.width*0.14+20;
var score = 0;
var bbbsss=0;
var lives = 3;
var bricks = [];
var bricksleft = [];
var bricksright = [];
var bricksl=[];
var bricksr=[];
const MAXNUM=70;
var lastT=-1;
var TIME=301;
var lastV=-1;

for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
for(c=0; c<brickColumnCount; c++) {
    bricksleft[c] = [];
    for(r=0; r<brickRowCount/2; r++) {
        bricksleft[c][r] = { x: 0, y: 0, status: 1 };
    }
}
for(c=0; c<brickColumnCount; c++) {
    bricksright[c] = [];
    for(r=0; r<brickRowCount/2; r++) {
        bricksright[c][r] = { x: 0, y: 0, status: 1 };
    }
}
for(r=0; r<brickRowCount/2; r++) {
    bricksl[r] = { x: 0, y: 0, status: 1 };
}
for(r=0; r<brickRowCount/2; r++) {
    bricksr[r] = { x: 0, y: 0, status: 1 };
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchmove", MoveHandler,false);
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
function MoveHandler(e) {
    var relativeX = e.touches[0].pageX;
    var relativeY = e.touches[0].pageY;
    if(relativeX > canvas.width*0.14+brickHeight+paddleWidth/2 && relativeX < canvas.width*0.84-paddleWidth/2) {
        paddleX = relativeX - paddleWidth/2;
    }
    else if(relativeX > canvas.width*0.84-paddleWidth/2)
        paddleX=canvas.width*0.84-paddleWidth;
    else
        paddleX=canvas.width*0.14+brickHeight;
}
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    if(c==2)
                        score+=20;
                    else
                        score+=30;
                    bbbsss++;
                    if(bbbsss == MAXNUM) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount/2; r++) {
            var b = bricksleft[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickHeight && y > b.y && y < b.y+brickWidth) {
                    dx = -dx;
                    b.status = 0;
                    score+=10;
                    bbbsss++;
                    if(bbbsss == MAXNUM) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount/2; r++) {
            var b = bricksright[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickHeight && y > b.y && y < b.y+brickWidth) {
                    dx = -dx;
                    b.status = 0;
                    score+=10;
                    bbbsss++;
                    if(bbbsss == MAXNUM) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
    for(r=0; r<brickRowCount/2; r++) {
        var b = bricksl[r];
        if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score+=10;
                bbbsss++;
                if(bbbsss == MAXNUM) {
                    alert("YOU WIN, CONGRATS!");
                    document.location.reload();
                }
            }
        }
    }
    for(r=0; r<brickRowCount/2; r++) {
        var b = bricksr[r];
        if(b.status == 1) {
            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                dy = -dy;
                b.status = 0;
                score+=10;
                bbbsss++;
                if(bbbsss == MAXNUM) {
                    alert("YOU WIN, CONGRATS!");
                    document.location.reload();
                }
            }
        }
    }
    if(x > canvas.width*0.14 && x < canvas.width*0.14+brickHeight && y > 5 && y < 5+brickHeight*5) {
        dx = -dx;
    }
    if(x > canvas.width*0.84 && x < canvas.width*0.84+brickHeight && y > 5 && y < 5+brickHeight*5) {
        dx = -dx;
    }
    if(x > canvas.width*0.035 && x < canvas.width*0.035+canvas.width*0.11+brickHeight && y > brickHeight*5 && y < brickHeight*6) {
        dy = -dy;
    }
    if(x > canvas.width*0.84 && x < canvas.width*0.84+canvas.width*0.11+brickHeight && y > brickHeight*5 && y < brickHeight*6) {
        dy = -dy;
    }
    if(x > canvas.width*0.025+brickHeight && x < canvas.width*0.025+brickHeight+canvas.width*0.14-brickHeight && y > canvas.height*0.5-brickHeight && y < canvas.height*0.5) {
        dy = -dy;
    }
    if(x > canvas.width*0.84 && x < canvas.width*0.84+canvas.width*0.14-brickHeight && y > canvas.height*0.5-brickHeight && y < canvas.height*0.5) {
        dy = -dy;
    }
    if(x > canvas.width*0.14 && x < canvas.width*0.14+brickHeight && y > canvas.height*0.5 && y < canvas.height*0.7) {
        dx = -dx;
    }
    if(x > canvas.width*0.84 && x < canvas.width*0.84+brickHeight && y > canvas.height*0.5 && y < canvas.height*0.7) {
        dx = -dx;
    }
    if(x > canvas.width*0.14 && x < canvas.width*0.14+brickHeight && y > canvas.height*0.9 && y < canvas.height*1.1) {
        dx = -dx;
    }
    if(x > canvas.width*0.84 && x < canvas.width*0.84+brickHeight && y > canvas.height*0.9 && y < canvas.height*1.1) {
        dx = -dx;
    }
    if(x > canvas.width/2 && x < canvas.width/2+brickHeight && y > canvas.height*0.6-paddleHeight-brickWidth && y < canvas.height*0.6-paddleHeight-brickWidth+brickWidth) {
        dx = -dx;
    }
    if(x > canvas.width*0.3-brickHeight && x < canvas.width*0.3+brickHeight*3 && y > canvas.height*0.25+brickHeight && y < canvas.height*0.25+brickHeight*3) {
        score+=10;
        dx = -dx;
    }
    if(x > canvas.width*0.3 && x < canvas.width*0.3+brickHeight*2 && y > canvas.height*0.25 && y < canvas.height*0.25+brickHeight*4) {
        score+=10;
        dy = -dy;
    }
    if(x > canvas.width*0.7-brickHeight*2 && x < canvas.width*0.7+brickHeight*2 && y > canvas.height*0.25+brickHeight && y < canvas.height*0.25+brickHeight*3) {
        score+=10;
        dx = -dx;
    }
    if(x > canvas.width*0.7-brickHeight && x < canvas.width*0.7+brickHeight && y > canvas.height*0.25 && y < canvas.height*0.25+brickHeight*4) {
        score+=10;
        dy = -dy;
    }
    if(x > canvas.width*0.45 && x < canvas.width*0.45+brickHeight && y > canvas.height*0.4 && y < canvas.height*0.4+brickHeight) {
        dy = -dy;
    }
    if(x > canvas.width*0.55 && x < canvas.width*0.55+brickHeight && y > canvas.height*0.4 && y < canvas.height*0.4+brickHeight) {
        dy = -dy;
    }
}

const pink = "#DE00A0";
const purple = "#9E00DD";
const yellow = "#FED000";
const blue = "#0054FC";
const white = "#fff";
const black = "#000";

function drawEdge() {
    ctx.beginPath();
    ctx.rect(canvas.width*0.14, 5, canvas.width*0.7, brickHeight);
    ctx.fillStyle = "#DE00A0";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.14, 5, brickHeight, brickHeight*5);
    ctx.fillStyle = "#DE00A0";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.84, 5, brickHeight, brickHeight*5);
    ctx.fillStyle = "#DE00A0";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.035, brickHeight*4.5, canvas.width*0.11+brickHeight, brickHeight);
    ctx.fillStyle = "#9E00DD";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.84, brickHeight*4.5, canvas.width*0.11+brickHeight, brickHeight);
    ctx.fillStyle = "#9E00DD";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.04,brickHeight*5);
    ctx.lineTo(canvas.width*0.04,canvas.height);
    ctx.lineTo(canvas.width*0.04+brickHeight,canvas.height);
    ctx.lineTo(canvas.width*0.04+brickHeight,brickHeight*5);
    ctx.strokeStyle="#9E00DD";
    ctx.stroke();
    ctx.fillStyle="#9E00DD";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.95,brickHeight*5);
    ctx.lineTo(canvas.width*0.95,canvas.height);
    ctx.lineTo(canvas.width*0.95+brickHeight,canvas.height);
    ctx.lineTo(canvas.width*0.95+brickHeight,brickHeight*5);
    ctx.strokeStyle="#9E00DD";
    ctx.stroke();
    ctx.fillStyle="#9E00DD";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.025+brickHeight, canvas.height*0.5-brickHeight, canvas.width*0.14-brickHeight, brickHeight);
    ctx.fillStyle = "#0054FC";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.84, canvas.height*0.5-brickHeight, canvas.width*0.14-brickHeight, brickHeight);
    ctx.fillStyle = "#0054FC";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.14, canvas.height*0.5, brickHeight, canvas.height*0.2);
    ctx.fillStyle = "#0054FC";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.84, canvas.height*0.5, brickHeight, canvas.height*0.2);
    ctx.fillStyle = "#0054FC";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.14, canvas.height*0.9, brickHeight, canvas.height*0.2);
    ctx.fillStyle = "#9E00DD";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width*0.84, canvas.height*0.9, brickHeight, canvas.height*0.2);
    ctx.fillStyle = "#9E00DD";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.3,canvas.height*0.25);
    ctx.lineTo(canvas.width*0.3+brickHeight*2,canvas.height*0.25);
    ctx.lineTo(canvas.width*0.3+brickHeight*3,canvas.height*0.25+brickHeight);
    ctx.lineTo(canvas.width*0.3+brickHeight*3,canvas.height*0.25+brickHeight*3);
    ctx.lineTo(canvas.width*0.3+brickHeight*2,canvas.height*0.25+brickHeight*4);
    ctx.lineTo(canvas.width*0.3,canvas.height*0.25+brickHeight*4);
    ctx.lineTo(canvas.width*0.3-brickHeight,canvas.height*0.25+brickHeight*3);
    ctx.lineTo(canvas.width*0.3-brickHeight,canvas.height*0.25+brickHeight);
    ctx.strokeStyle="#fff";
    ctx.stroke();
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("10", canvas.width*0.3+brickHeight,canvas.height*0.25+brickHeight*2.7);
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.7-brickHeight,canvas.height*0.25);
    ctx.lineTo(canvas.width*0.7+brickHeight*1,canvas.height*0.25);
    ctx.lineTo(canvas.width*0.7+brickHeight*2,canvas.height*0.25+brickHeight);
    ctx.lineTo(canvas.width*0.7+brickHeight*2,canvas.height*0.25+brickHeight*3);
    ctx.lineTo(canvas.width*0.7+brickHeight*1,canvas.height*0.25+brickHeight*4);
    ctx.lineTo(canvas.width*0.7-brickHeight,canvas.height*0.25+brickHeight*4);
    ctx.lineTo(canvas.width*0.7-brickHeight*2,canvas.height*0.25+brickHeight*3);
    ctx.lineTo(canvas.width*0.7-brickHeight*2,canvas.height*0.25+brickHeight);
    ctx.strokeStyle="#fff";
    ctx.stroke();
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText("10", canvas.width*0.7,canvas.height*0.25+brickHeight*2.7);
    ctx.beginPath();
    ctx.rect(canvas.width*0.45+brickHeight, canvas.height*0.4+brickHeight*0.1, canvas.width*0.1-brickHeight, brickHeight*0.8);
    ctx.fillStyle = "#002A84";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.45,canvas.height*0.4);
    ctx.lineTo(canvas.width*0.45+brickHeight,canvas.height*0.4+brickHeight/2);
    ctx.lineTo(canvas.width*0.45,canvas.height*0.4+brickHeight);
    ctx.strokeStyle="#fff";
    ctx.stroke();
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(canvas.width*0.55+brickHeight,canvas.height*0.4);
    ctx.lineTo(canvas.width*0.55,canvas.height*0.4+brickHeight/2);
    ctx.lineTo(canvas.width*0.55+brickHeight,canvas.height*0.4+brickHeight);
    ctx.strokeStyle="#fff";
    ctx.stroke();
    ctx.fillStyle="#fff";
    ctx.fill();
    ctx.beginPath();
    ctx.rect(canvas.width/2, canvas.height*0.6-paddleHeight-brickWidth, brickHeight, brickWidth);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height*0.95-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if(c<brickColumnCount-1)
                    ctx.fillStyle = "#DE00A0";
                else
                    ctx.fillStyle = "#FED000";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawBricksleft() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount/2; r++) {
            if(bricksleft[c][r].status == 1) {
                var brickX = (c*(brickHeight+brickPadding))+brickOffsetLeft-brickHeight*4;
                var brickY = (r*(brickWidth+brickPadding))+brickOffsetTop+brickHeight*4;
                bricksleft[c][r].x = brickX;
                bricksleft[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickHeight, brickWidth);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawBricksright() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount/2; r++) {
            if(bricksright[c][r].status == 1) {
                var brickX = (c*(brickHeight+brickPadding))+canvas.width-brickOffsetLeft+brickHeight;
                var brickY = (r*(brickWidth+brickPadding))+brickOffsetTop+brickHeight*4;
                bricksright[c][r].x = brickX;
                bricksright[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickHeight, brickWidth);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawBricksl() {
    for(r=0; r<brickRowCount/2; r++) {
        if(bricksl[r].status == 1) {
            var brickX = brickHeight*3;
            var brickY = (r*(brickHeight+brickPadding))+canvas.height*0.5+brickPadding;
            bricksl[r].x = brickX;
            bricksl[r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
function drawBricksr() {
    for(r=0; r<brickRowCount/2; r++) {
        if(bricksr[r].status == 1) {
            var brickX = canvas.width*0.9-brickHeight;
            var brickY = (r*(brickHeight+brickPadding))+canvas.height*0.5+brickPadding;
            bricksr[r].x = brickX;
            bricksr[r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Lives: "+lives, canvas.width*0.9+brickHeight, 15);
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Score: "+score, canvas.width*0.4+brickHeight, 15);
}
function drawTime() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#fff";
    ctx.fillText("Time Left: ", canvas.width*0.1+brickHeight, 15);
    ctx.fillText(TIME+'s', canvas.width*0.1+brickHeight, 36);
}
function draw() {
    var d=new Date();
    var t=d.toLocaleTimeString();
    if(lastT!==t){
        TIME-=1;
        lastT=t;
        if(TIME===0){
            alert("GAME OVER");
            document.location.reload();
        }
    }
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBricksleft();
    drawBricksright();
    drawBricksl();
    drawBricksr();
    drawEdge();
    drawBall();
    drawPaddle();
    drawLives();
    drawTime();
    drawScore();
    collisionDetection();
    if(x + dx > canvas.width*0.93+brickHeight-ballRadius || x + dx < ballRadius+canvas.width*0.05) {
        dx = -dx;
    }
    if(y + dy < ballRadius+5+brickHeight) {
        dy = -dy;
    }
    else if(y + dy > canvas.height*0.95-ballRadius-paddleHeight/2 && y + dy < canvas.height*0.95-ballRadius+paddleHeight && x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        dx = (-paddleX-paddleWidth/2+x)/10;
    }
    else if(y + dy > canvas.height) {
        lives--;
        if(!lives) {
            alert("GAME OVER");
            document.location.reload();
        }
        else {
            x = canvas.width/2;
            y = canvas.height*0.80;
            dx = 3;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
    }
    if(rightPressed && paddleX < canvas.width*0.84-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > canvas.width*0.14+brickHeight) {
        paddleX -= 7;
    }
    if(paddleX < canvas.width*0.14+brickHeight) {
        paddleX=canvas.width*0.14+brickHeight;
    }
    if(paddleX > canvas.width*0.84-paddleWidth) {
        paddleX=canvas.width*0.84-paddleWidth;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

function abs(a){
    if(a>0)return a;
    return -a;
}

function ball1(){
    ballRadius=2;
}

function ball2(){
    ballRadius=4;
}

function ball3(){
    ballRadius=6;
}

draw();