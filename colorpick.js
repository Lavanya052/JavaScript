var NOS=6;

var arr=[];

var picked;
var sqr=document.getElementsByClassName('sqr');
var target=document.getElementById('target');
var msg =document.getElementById('msg');
var head=document.querySelector('h1');
var reset=document.getElementById("NewColor");

init();

function init()
{
	arr=generateRandomColor(NOS);
	picked=arr[randomPickedColorIndex()];
	target.textContent=picked;
	for(var i=0;i<sqr.length;i++)
	{
		sqr[i].style.backgroundColor=arr[i]; //set color in palatte
		sqr[i].addEventListener("click",function(){
				if(picked===this.style.backgroundColor)
				{
					msg.textContent="Correct";
					msg.style.color="green";
					changeColor(this.style.backgroundColor);
					reset.textContent="Play Again?";
				}
				else
				{
					msg.textContent="Try Again";
					msg.style.color="red";
					this.style.backgroundColor="black";
				}
	});
}
}


reset.addEventListener("click",resetIn);//play again call

function randomPickedColorIndex()
{	
	return Math.floor(Math.random()*arr.length);//between 0-0.9(0-5)
}


function generateRandomColor(limit)
{
	var color=[];
	for (var i =0; i<limit;i++)
		color.push(rgbGenerator());
	return color;
	}

function rgbGenerator()
{
	var r=Math.floor(Math.random()*256);
	var g=Math.floor(Math.random()*256);
	var b=Math.floor(Math.random()*256);
	return "rgb("+r+","+g+","+b+")";
}

function changeColor(color)//after click crt option
{
	for (var i =0; i<sqr.length; i++) {
		sqr[i].style.backgroundColor=color;// all palatte 
	}
	head.style.backgroundColor=color;//head color change to ans color
}

function resetIn()
{
	arr=generateRandomColor(NOS);
	picked=arr[randomPickedColorIndex()];
	target.textContent=picked;
	msg.textContent="";
	head.style.backgroundColor="#008090";
	for(var i=0;i<sqr.length;i++)
{
	sqr[i].style.backgroundColor=arr[i]; //set color in palatte
	sqr[i].addEventListener("click",function(){
				if(picked==this.style.backgroundColor)
				{
					msg.textContent="Correct";
					msg.style.color="green";
					changeColor(this.style.backgroundColor);
					reset.textContent="Play Again?";
				}
				else
				{
					msg.textContent="Try Again";
					msg.style.color="red";
					this.style.backgroundColor="black";
				}
	});
}

}