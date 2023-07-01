var can =document.getElementById("pong");
var draw=can.getContext('2d');

const ball={
	x:can.width/2,//start from  posX
	y:can.height/2,//start from  posY
	r:10,
	velX:5,
	velY:5,
	speed:7,
	color:"green"
}

const user={
	x:0,//start from  posX
	y:(can.height-100)/2,//start from  posY
	width:10,
	height:100,
	score:0,
	color:"red",
}

const cpu={
	x:can.width-10,//start from  posX
	y:(can.height-100)/2,//start from posY
	width:10,
	height:100,
	score:0,
	color:"red",
}

const sep={
	x:(can.width-2)/2,//make it center
	y:0,
	width:2,
	height:10,
	color:"orange",
}

function drawRectangle(x,y,w,h,color){
	draw.fillStyle=color;
	draw.fillRect(x,y,w,h);

}

function drawCircle(x,y,r,color){
	draw.fillStyle=color;
	draw.beginPath();
	draw.arc(x,y,r,0,Math.PI*2,true);
	draw.closePath();
	draw.fill();
}

function drawScore(text,x,y){
	draw.fillStyle="white";
	draw.font="60px Arial";
	draw.fillText(text,x,y);
}

function drawSeparator(){
	for (var i = 0; i <=can.height; i+=15) {
		drawRectangle(sep.x ,sep.y + i,sep.width,sep.height,sep.color);

	}
}
function restart() {//again move to center
	ball.x=can.width/2;
	ball.y=can.height/2;
	ball.velX=-ball.velX;
	ball.speed=5;
}

can.addEventListener("mousemove",getMousePos);

function getMousePos(evt)
{
	let rect = can.getBoundingClientRect();
	user.y=evt.clientY - rect.top - user.height/2;
} 

function detect_collision(ball,player)
{
	player.top=player.y;
	player.bottom=player.y+player.height;
	player.left=player.x;
	player.right=player.x+player.width;

	ball.top= ball.y-ball.r; 
	ball.bottom= ball.y+ball.r; 
	ball.left= ball.x-ball.r; 
	ball.right= ball.x+ball.r; 

	return player.left < ball.right && player.top < ball.bottom  && player.right > ball.left && player.bottom > ball.top;
}

function cpu_move(){
	if(cpu.y<ball.y)
		cpu.y+=5;
	else
		cpu.y-=5;
}


function helper(){
	drawRectangle(0,0,can.width,can.height,"black");
	drawScore(user.score,can.width/4,can.height/5);
	drawScore(cpu.score,3*can.width/4,can.height/5);
	drawSeparator();
	drawRectangle(user.x,user.y,user.width,user.height,user.color);
	drawRectangle(cpu.x,cpu.y,cpu.width,cpu.height,cpu.color);
	drawCircle(ball.x,ball.y,ball.r,ball.color);

}


function update(){
    
    if( ball.x - ball.r < 0 ){
        cpu.score++;
        restart();
        
    }else if( ball.x + ball.rs > can.width){
        user.score++;
        restart();
    }
    
    ball.x += ball.velX;
    ball.y += ball.velY;
    
    cpu.y += ((ball.y - (cpu.y + cpu.height/2)))*0.1;
    
   
    if(ball.y - ball.r < 0 || ball.y + ball.r > can.height){
        ball.velY = -ball.velY;
     
    }

    let player = (ball.x + ball.r < can.width/2) ? user : cpu;
    
    if(detect_collision(ball,player)){
      
        let collidePoint = (ball.y - (player.y + player.height/2));
        
        collidePoint = collidePoint / (player.height/2);
        
        let angleRad = (Math.PI/4) * collidePoint;
        
      
        let direction = (ball.x + ball.r < can.width/2) ? 1 : -1;
        ball.velX = direction * ball.speed * Math.cos(angleRad);
        ball.velY = ball.speed * Math.sin(angleRad);
        
   
        ball.speed += 0.1;
    }
}
function call_back(){
	update();
	helper();//reset the board
}

var fps=50;
var looper=setInterval(call_back,1000/fps);//make illution of moving
