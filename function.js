    // vẽ canvas
    
    let canvas=document.getElementById('myCanvas');

    function drawBall(){//vẽ hình tròn
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
        ctx.fillStyle = ball;
        ctx.fill();
        ctx.closePath();
    }
    function draw(){//di chuyển hình tròn
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawScore();
        if (x + dx < ballRadius || x+ dx >canvas.width-ballRadius){
            dx=-dx;
        }
        if (y + dy < ballRadius){
            dy=-dy;
            score++;
            if(score == 5) { dx = -3; dy = 3, ball = "white"};
            if(score > 10) {paddleWidth = 100};
            if(score > 20) {paddleWidth = 80};
            if(score == 30) {ballRadius = 7};
        }
        else if (y + dy > canvas.height - ballRadius){
            
            if (x>paddleX && x<paddleX+paddleWidth){
                dy=-dy;
               
            }
            else{
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval);//trình duyệt sẽ xóa hết hình
            }
        }
        if(rightPressed) {
            paddleX += 7;
            if (paddleX + paddleWidth > canvas.width){
                paddleX = canvas.width - paddleWidth;
            }
        }
        else if(leftPressed) {
            paddleX -= 7;
            if (paddleX < 0){
                paddleX = 0;
            }
        }
        
        x+=dx;
        y+=dy;
    }
    
    function drawPaddle(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Score: "+score, 8, 20);
    }
    function keyDownHandler(e){
        if(e.key=='right' || e.key=="ArrowRight"){
            rightPressed=true;
        }
        else if(e.key=='left' || e.key=='ArrowLeft'){
            leftPressed=true;
        }
    }
    function keyUpHandler(e){
        if(e.key=='right' || e.key=="ArrowRight"){
            rightPressed=false;
        }
        else if(e.key=='left' || e.key=='ArrowLeft'){
            leftPressed=false;
        }
    }

    let ctx=canvas.getContext('2d');
    let interval= setInterval(draw, 10);
    let x=canvas.width/2;
    let y=canvas.height-30;
    let dx=2;
    let dy=-2;
    let ballRadius=10;
    let paddleHeight=10;
    let paddleWidth=120;
    let paddleX = (canvas.width-paddleWidth)/2;
    let rightPressed=false;
    let leftPressed=false;
    let score=0;
    let ball='red';
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
