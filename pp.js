var can =document.getElementById("table");
var draw=can.getContext('2d');

draw.fillStyle='white';
draw.fillRect(0,0,can.width,can.height);

//shapes only inside canvas range(width,height)
draw.fillStyle="red";
draw.fillRect(300,300,40,40);

draw.fillStyle="orange"
draw.beginPath();
draw.arc(350,350,10,0,Math.PI*2,false);
draw.closePath();
draw.fill();


